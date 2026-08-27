import { createClient } from "@supabase/supabase-js";
import { Pool, type PoolClient } from "pg";
import { lobSelectExpression, migrationMode, parseRole, REQUIRED_LEGACY_COLUMNS } from "./legacy-migration";

type LegacyUser = {
  id: number;
  email: string;
  username: string;
  password_hash: string;
  display_name: string;
  role: string;
  created_at: Date;
};

type LegacySubject = { id: number; name: string; color_hex: string; sort_order: number };
type LegacyTopic = {
  id: number;
  subject_id: number;
  parent_topic_id: number | null;
  title: string;
  sort_order: number;
  preview_snippet: string;
  content: string;
};
type LegacyRelation = { topic_id: number; related_topic_id: number };
type LegacyContact = { id: number; name: string; email: string; message: string; created_at: Date };

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

async function validateLegacySchema(client: PoolClient) {
  for (const [table, requiredColumns] of Object.entries(REQUIRED_LEGACY_COLUMNS)) {
    const result = await client.query<{ column_name: string }>(
      `select column_name
       from information_schema.columns
       where table_schema = 'public' and table_name = $1`,
      [table],
    );
    const available = new Set(result.rows.map((row) => row.column_name));
    const missing = requiredColumns.filter((column) => !available.has(column));
    if (missing.length > 0) {
      throw new Error(`Legacy table public.${table} is missing: ${missing.join(", ")}`);
    }
  }
}

async function columnType(client: PoolClient, table: string, column: string) {
  const result = await client.query<{ udt_name: string }>(
    `select udt_name
     from information_schema.columns
     where table_schema = 'public' and table_name = $1 and column_name = $2`,
    [table, column],
  );
  if (!result.rows[0]) throw new Error(`Could not determine type for ${table}.${column}`);
  return result.rows[0].udt_name;
}

async function loadLegacyData(client: PoolClient) {
  const [topicContentType, contactMessageType] = await Promise.all([
    columnType(client, "topics", "content"),
    columnType(client, "contact_messages", "message"),
  ]);

  const [users, subjects, topics, relations, contacts] = await Promise.all([
    client.query<LegacyUser>(
      `select id, email, username, password_hash, display_name, role, created_at
       from public.users order by id`,
    ),
    client.query<LegacySubject>(
      `select id, name, color_hex, sort_order from public.subjects order by id`,
    ),
    client.query<LegacyTopic>(
      `select id, subject_id, parent_topic_id, title, sort_order, preview_snippet,
              ${lobSelectExpression("content", topicContentType)}
       from public.topics order by id`,
    ),
    client.query<LegacyRelation>(
      `select topic_id, related_topic_id from public.topic_related_ids order by topic_id, related_topic_id`,
    ),
    client.query<LegacyContact>(
      `select id, name, email, ${lobSelectExpression("message", contactMessageType)}, created_at
       from public.contact_messages order by id`,
    ),
  ]);

  for (const user of users.rows) {
    parseRole(user.role);
    if (!/^\$2[aby]\$/.test(user.password_hash)) {
      throw new Error(`User ${user.id} does not have a supported bcrypt password hash`);
    }
  }

  return {
    users: users.rows,
    subjects: subjects.rows,
    topics: topics.rows,
    relations: relations.rows,
    contacts: contacts.rows,
  };
}

async function targetCounts(client: PoolClient) {
  const result = await client.query<{ table_name: string; rows: string }>(`
    select 'profiles' as table_name, count(*)::text as rows from public.profiles
    union all select 'subjects', count(*)::text from public.subjects
    union all select 'topics', count(*)::text from public.topics
    union all select 'topic_related_topics', count(*)::text from public.topic_related_topics
    union all select 'contact_messages', count(*)::text from public.contact_messages
    order by table_name
  `);
  return Object.fromEntries(result.rows.map((row) => [row.table_name, Number(row.rows)]));
}

async function importUsers(
  target: PoolClient,
  supabaseUrl: string,
  secretKey: string,
  users: LegacyUser[],
) {
  const admin = createClient(supabaseUrl, secretKey, {
    auth: { autoRefreshToken: false, detectSessionInUrl: false, persistSession: false },
  });

  for (const user of users) {
    const existingLegacy = await target.query<{ id: string }>(
      "select id from public.profiles where legacy_user_id = $1",
      [user.id],
    );
    let authUserId = existingLegacy.rows[0]?.id;

    if (!authUserId) {
      const existingEmail = await target.query<{ id: string }>(
        "select id from auth.users where lower(email) = lower($1) limit 1",
        [user.email],
      );
      authUserId = existingEmail.rows[0]?.id;
    }

    if (!authUserId) {
      const { data, error } = await admin.auth.admin.createUser({
        email: user.email,
        password_hash: user.password_hash,
        email_confirm: true,
        user_metadata: { username: user.username, display_name: user.display_name },
      });
      if (error) throw new Error(`Could not import user ${user.id}: ${error.message}`);
      authUserId = data.user.id;
    }

    await target.query(
      `update public.profiles
       set username = $2,
           display_name = $3,
           role = $4::public.user_role,
           legacy_user_id = $5,
           created_at = $6
       where id = $1`,
      [authUserId, user.username, user.display_name, parseRole(user.role), user.id, user.created_at],
    );
  }
}

async function importPublicData(
  target: PoolClient,
  data: Awaited<ReturnType<typeof loadLegacyData>>,
) {
  await target.query("begin");
  try {
    for (const subject of data.subjects) {
      await target.query(
        `insert into public.subjects (id, name, color_hex, sort_order)
         values ($1, $2, $3, $4)
         on conflict (id) do update set
           name = excluded.name,
           color_hex = excluded.color_hex,
           sort_order = excluded.sort_order`,
        [subject.id, subject.name, subject.color_hex, subject.sort_order],
      );
    }

    for (const topic of data.topics) {
      await target.query(
        `insert into public.topics
           (id, subject_id, parent_topic_id, title, sort_order, preview_snippet, content)
         values ($1, $2, null, $3, $4, $5, $6)
         on conflict (id) do update set
           subject_id = excluded.subject_id,
           parent_topic_id = null,
           title = excluded.title,
           sort_order = excluded.sort_order,
           preview_snippet = excluded.preview_snippet,
           content = excluded.content`,
        [
          topic.id,
          topic.subject_id,
          topic.title,
          topic.sort_order,
          topic.preview_snippet,
          topic.content,
        ],
      );
    }

    for (const topic of data.topics) {
      if (topic.parent_topic_id !== null) {
        await target.query("update public.topics set parent_topic_id = $2 where id = $1", [
          topic.id,
          topic.parent_topic_id,
        ]);
      }
    }

    await target.query("delete from public.topic_related_topics");
    for (const relation of data.relations) {
      await target.query(
        `insert into public.topic_related_topics (topic_id, related_topic_id)
         values ($1, $2) on conflict do nothing`,
        [relation.topic_id, relation.related_topic_id],
      );
    }

    for (const contact of data.contacts) {
      await target.query(
        `insert into public.contact_messages (id, name, email, message, created_at)
         values ($1, $2, $3, $4, $5)
         on conflict (id) do update set
           name = excluded.name,
           email = excluded.email,
           message = excluded.message,
           created_at = excluded.created_at`,
        [contact.id, contact.name, contact.email, contact.message, contact.created_at],
      );
    }

    await target.query(
      "select setval(pg_get_serial_sequence('public.subjects', 'id'), greatest(coalesce(max(id), 1), 1), count(*) > 0) from public.subjects",
    );
    await target.query(
      "select setval(pg_get_serial_sequence('public.topics', 'id'), greatest(coalesce(max(id), 1), 1), count(*) > 0) from public.topics",
    );
    await target.query(
      "select setval(pg_get_serial_sequence('public.contact_messages', 'id'), greatest(coalesce(max(id), 1), 1), count(*) > 0) from public.contact_messages",
    );
    await target.query("commit");
  } catch (error) {
    await target.query("rollback");
    throw error;
  }
}

async function main() {
  const mode = migrationMode(process.argv.slice(2));
  const legacyPool = new Pool({ connectionString: requiredEnv("LEGACY_DATABASE_URL") });
  const targetPool = new Pool({ connectionString: requiredEnv("SUPABASE_DB_URL") });
  const legacy = await legacyPool.connect();
  const target = await targetPool.connect();

  try {
    await validateLegacySchema(legacy);
    const data = await loadLegacyData(legacy);
    const before = await targetCounts(target);
    const sourceCounts = {
      users: data.users.length,
      subjects: data.subjects.length,
      topics: data.topics.length,
      topic_related_topics: data.relations.length,
      contact_messages: data.contacts.length,
    };

    console.log(JSON.stringify({ mode, source: sourceCounts, targetBefore: before }, null, 2));
    if (mode === "dry-run") {
      console.log("Dry run complete. Re-run with --apply to migrate records.");
      return;
    }

    await importUsers(
      target,
      requiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      requiredEnv("SUPABASE_SECRET_KEY"),
      data.users,
    );
    await importPublicData(target, data);
    const after = await targetCounts(target);
    console.log(JSON.stringify({ mode, source: sourceCounts, targetAfter: after }, null, 2));
    console.log("Legacy migration completed. Existing JWTs and reset tokens were intentionally not copied.");
  } finally {
    legacy.release();
    target.release();
    await Promise.all([legacyPool.end(), targetPool.end()]);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
