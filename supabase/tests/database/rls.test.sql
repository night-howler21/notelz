begin;

create extension if not exists pgtap with schema extensions;
select extensions.plan(14);

insert into auth.users (id, email, raw_user_meta_data)
values
  ('00000000-0000-0000-0000-000000000001', 'one@example.com', '{"username":"student_one","display_name":"Student One"}'),
  ('00000000-0000-0000-0000-000000000002', 'two@example.com', '{"username":"student_two","display_name":"Student Two"}');

insert into public.subjects (id, name, color_hex, sort_order)
values (9001, 'Policy Test', '#A9CBA0', 9001)
on conflict (id) do nothing;

insert into public.topics (id, subject_id, title, sort_order, preview_snippet, content)
values (9001, 9001, 'Policy Topic', 0, 'Preview', 'Content')
on conflict (id) do nothing;

select extensions.is(
  (select username from public.profiles where id = '00000000-0000-0000-0000-000000000001'),
  'student_one',
  'the auth trigger creates a profile'
);

set local role authenticated;
select set_config(
  'request.jwt.claims',
  '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}',
  true
);

select extensions.is(
  (select count(*)::integer from public.profiles),
  1,
  'an authenticated user can read only their own profile'
);
select extensions.is(
  (select count(*)::integer from public.subjects where id = 9001),
  1,
  'an authenticated user can read subjects'
);
select extensions.throws_ok(
  $$update public.profiles set display_name = 'Changed' where id = '00000000-0000-0000-0000-000000000001'$$,
  '42501',
  'authenticated users cannot update profiles'
);
select extensions.throws_ok(
  $$insert into public.topics (subject_id, title, sort_order, preview_snippet, content) values (9001, 'No', 0, 'No', 'No')$$,
  '42501',
  'authenticated users cannot create topics'
);
select extensions.lives_ok(
  $$insert into public.contact_messages (name, email, message) values ('Student', 'student@example.com', 'Help')$$,
  'authenticated users can submit contact messages'
);
select extensions.lives_ok(
  $$insert into public.saved_topics (user_id, topic_id) values ('00000000-0000-0000-0000-000000000001', 9001)$$,
  'users can save a topic to their own library'
);
select extensions.throws_ok(
  $$insert into public.saved_topics (user_id, topic_id) values ('00000000-0000-0000-0000-000000000002', 9001)$$,
  '42501',
  'users cannot write to another user library'
);
select extensions.is(
  (select count(*)::integer from public.saved_topics),
  1,
  'users see only their own saved topics'
);
select extensions.lives_ok(
  $$insert into public.topic_annotations (user_id, topic_id, content) values ('00000000-0000-0000-0000-000000000001', 9001, 'Private')$$,
  'users can create private annotations'
);

reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);

select extensions.throws_ok(
  $$select * from public.subjects$$,
  '42501',
  'anonymous visitors cannot read notes'
);
select extensions.lives_ok(
  $$insert into public.contact_messages (name, email, message) values ('Visitor', 'visitor@example.com', 'Hello')$$,
  'anonymous visitors can submit contact messages'
);
select extensions.throws_ok(
  $$select * from public.contact_messages$$,
  '42501',
  'contact submissions cannot be read through the public API'
);
select extensions.throws_ok(
  $$select * from public.saved_topics$$,
  '42501',
  'anonymous visitors cannot read personal libraries'
);

reset role;
select * from extensions.finish();
rollback;
