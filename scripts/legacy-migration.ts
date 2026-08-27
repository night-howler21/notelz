export const REQUIRED_LEGACY_COLUMNS = {
  users: ["id", "email", "username", "password_hash", "display_name", "role", "created_at"],
  subjects: ["id", "name", "color_hex", "sort_order"],
  topics: [
    "id",
    "subject_id",
    "parent_topic_id",
    "title",
    "sort_order",
    "preview_snippet",
    "content",
  ],
  topic_related_ids: ["topic_id", "related_topic_id"],
  contact_messages: ["id", "name", "email", "message", "created_at"],
} as const;

export type LegacyRole = "STUDENT" | "TUTOR" | "ADMIN";

export function parseRole(value: string): LegacyRole {
  if (value === "STUDENT" || value === "TUTOR" || value === "ADMIN") return value;
  throw new Error(`Unsupported legacy role: ${value}`);
}

export function lobSelectExpression(column: string, postgresType: string) {
  if (!/^[a-z_]+$/.test(column)) throw new Error(`Unsafe column name: ${column}`);
  return postgresType === "oid"
    ? `convert_from(lo_get(${column}), 'UTF8') as ${column}`
    : `${column}::text as ${column}`;
}

export function migrationMode(args: string[]) {
  const unknown = args.filter((arg) => arg !== "--apply");
  if (unknown.length > 0) throw new Error(`Unknown argument(s): ${unknown.join(", ")}`);
  return args.includes("--apply") ? "apply" : "dry-run";
}
