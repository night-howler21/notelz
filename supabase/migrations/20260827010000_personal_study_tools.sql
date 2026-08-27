create table public.saved_topics (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id bigint not null references public.topics (id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

create table public.study_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name varchar(60) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint study_lists_name_length check (char_length(trim(name)) between 1 and 60)
);

create unique index study_lists_user_normalized_name_idx
  on public.study_lists (user_id, lower(trim(name)));

create table public.study_list_topics (
  list_id uuid not null references public.study_lists (id) on delete cascade,
  topic_id bigint not null references public.topics (id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (list_id, topic_id)
);

create table public.topic_annotations (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id bigint not null references public.topics (id) on delete cascade,
  content text not null default '',
  drawing_data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id),
  constraint topic_annotations_content_length check (char_length(content) <= 10000),
  constraint topic_annotations_drawing_object check (jsonb_typeof(drawing_data) = 'object')
);

create table public.reading_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id bigint not null references public.topics (id) on delete cascade,
  progress_percent smallint not null default 0,
  last_read_at timestamptz not null default now(),
  completed_at timestamptz,
  primary key (user_id, topic_id),
  constraint reading_progress_percent_range check (progress_percent between 0 and 100)
);

create index saved_topics_saved_at_idx on public.saved_topics (user_id, saved_at desc);
create index study_lists_user_id_idx on public.study_lists (user_id, updated_at desc);
create index study_list_topics_topic_id_idx on public.study_list_topics (topic_id);
create index topic_annotations_updated_at_idx on public.topic_annotations (user_id, updated_at desc);
create index reading_progress_last_read_idx on public.reading_progress (user_id, last_read_at desc);

alter table public.saved_topics enable row level security;
alter table public.study_lists enable row level security;
alter table public.study_list_topics enable row level security;
alter table public.topic_annotations enable row level security;
alter table public.reading_progress enable row level security;

revoke all on table public.saved_topics from anon, authenticated;
revoke all on table public.study_lists from anon, authenticated;
revoke all on table public.study_list_topics from anon, authenticated;
revoke all on table public.topic_annotations from anon, authenticated;
revoke all on table public.reading_progress from anon, authenticated;

grant select, insert, update, delete on table public.saved_topics to authenticated;
grant select, insert, update, delete on table public.study_lists to authenticated;
grant select, insert, update, delete on table public.study_list_topics to authenticated;
grant select, insert, update, delete on table public.topic_annotations to authenticated;
grant select, insert, update, delete on table public.reading_progress to authenticated;

create policy "Users manage their saved topics"
  on public.saved_topics for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their study lists"
  on public.study_lists for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users read topics in their own lists"
  on public.study_list_topics for select
  to authenticated
  using (
    exists (
      select 1 from public.study_lists
      where study_lists.id = study_list_topics.list_id
        and study_lists.user_id = (select auth.uid())
    )
  );

create policy "Users add topics to their own lists"
  on public.study_list_topics for insert
  to authenticated
  with check (
    exists (
      select 1 from public.study_lists
      where study_lists.id = study_list_topics.list_id
        and study_lists.user_id = (select auth.uid())
    )
  );

create policy "Users remove topics from their own lists"
  on public.study_list_topics for delete
  to authenticated
  using (
    exists (
      select 1 from public.study_lists
      where study_lists.id = study_list_topics.list_id
        and study_lists.user_id = (select auth.uid())
    )
  );

create policy "Users manage their private annotations"
  on public.topic_annotations for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users manage their reading progress"
  on public.reading_progress for all
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
