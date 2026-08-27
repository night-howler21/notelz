insert into public.subjects (id, name, color_hex, sort_order)
values
  (1, 'Constitutional Law', '#A9CBA0', 0),
  (2, 'Torts', '#F0D89A', 1),
  (3, 'Contract Law', '#A8C8DE', 2),
  (4, 'Family Law', '#E8B4C0', 3)
on conflict (id) do update set
  name = excluded.name,
  color_hex = excluded.color_hex,
  sort_order = excluded.sort_order;

insert into public.topics
  (id, subject_id, parent_topic_id, title, sort_order, preview_snippet, content)
values
  (
    1, 1, null, 'Doctrine of Eclipse', 0,
    'A pre-Constitution law inconsistent with fundamental rights isn''t dead — just eclipsed, until the shadow lifts.',
    E'The Doctrine of Eclipse holds that a law in force before the Constitution came into effect, which conflicts with a Fundamental Right, is not wiped out entirely. Instead, it becomes unenforceable — "eclipsed" — for as long as the conflict lasts, without being erased from the statute book.\n\nIf the Fundamental Right in question is later amended so the conflict disappears, the eclipsed law automatically springs back into full force, without needing to be re-enacted. The shadow lifts, and the law is visible again.\n\nThis doctrine applies specifically to pre-Constitutional laws under Article 13(1). It was established in Bhikaji Narain Dhakras v. State of Madhya Pradesh (1955), building on the reasoning first explored in Keshavan Madhava Menon v. State of Bombay (1951).\n\nKey distinction to remember: the doctrine applies only to laws that existed before the Constitution. A post-Constitution law that violates a Fundamental Right is void from its inception under Article 13(2) — it is stillborn, not eclipsed, and a later amendment cannot revive it. It would need to be re-enacted entirely.'
  ),
  (
    2, 1, 1, 'Bhikaji Narain Dhakras v. State of MP (1955)', 0,
    'The case that gave the Doctrine of Eclipse its name — and showed a law springing back to life.',
    E'Case note. The Central Provinces and Berar Motor Vehicles (Amendment) Act, 1947 authorised a state monopoly over motor transport, conflicting with the newly-guaranteed right to carry on any occupation, trade, or business under Article 19(1)(g).\n\nWhen the Constitution commenced in 1950, the Act became unenforceable against citizens for that conflict — but it was not struck down outright, since it predated the Constitution and fell under Article 13(1) rather than 13(2).\n\nIn 1951, the First Amendment added Article 19(6), permitting the State to create such monopolies. The conflict disappeared, and the Supreme Court held that the Act was automatically freed from its eclipse and became fully enforceable again — without Parliament needing to re-pass it.\n\nThis is the case to cite whenever you explain the Doctrine of Eclipse: it is the clearest real-world example of a law being "revived," rather than merely upheld or struck down.'
  ),
  (
    3, 1, null, 'Doctrine of Severability', 1,
    'When only part of a law violates a fundamental right, courts strike down that part alone — if it can stand without the rest.',
    E'The Doctrine of Severability, drawn from Article 13, says that when a provision of a law is unconstitutional, only the offending part is struck down — provided it can be separated from the valid remainder without changing the character of the law.\n\nThe test is whether the legislature would have enacted the valid part at all, standing alone, without the invalid portion. If the valid and invalid parts are so mixed together that they form one inseparable whole, the entire law falls.\n\nA.K. Gopalan v. State of Madras (1950) is the classic illustration: most of the Preventive Detention Act was upheld, but Section 14 — which barred courts from examining the grounds of detention — was struck down alone, since the rest of the Act could function perfectly well without it.\n\nContrast this with a law entirely built around a single unconstitutional idea: there, nothing survives, because there is no independently workable remainder to sever.'
  ),
  (
    4, 1, null, 'Basic Structure Doctrine', 2,
    'Parliament can amend the Constitution — but never so far as to destroy its identity.',
    E'The Basic Structure Doctrine holds that while Parliament has wide power under Article 368 to amend the Constitution, it cannot alter or destroy its "basic structure" — the core framework that gives the Constitution its identity.\n\nIt was laid down in the landmark case Kesavananda Bharati v. State of Kerala (1973), decided by a wafer-thin 7–6 majority in a 13-judge bench, the largest ever assembled by the Supreme Court of India. The Court did not give an exhaustive list of what counts as "basic," but later judgments have included: the supremacy of the Constitution, the rule of law, judicial review, separation of powers, federalism, and free and fair elections.\n\nThe doctrine has repeatedly been the deciding factor in major cases — most notably Indira Gandhi v. Raj Narain (1975), where a constitutional amendment nullifying a specific election judgment was struck down for violating free and fair elections as part of the basic structure.\n\nExam tip: this is the single most-cited doctrine in Indian constitutional law essays — always anchor it to Kesavananda Bharati and be ready to name at least three "basic features."'
  ),
  (
    5, 1, 4, 'Kesavananda Bharati v. State of Kerala (1973)', 0,
    'Thirteen judges, a 7–6 split, and the case that decided Parliament''s amending power has a ceiling.',
    E'Case note. Kesavananda Bharati, head of a religious institution in Kerala, challenged land reform legislation that restricted the management of his institution''s property — but the case grew into a direct test of how far Parliament could go in amending the Constitution.\n\nIt followed Golaknath v. State of Punjab (1967), where the Court had held Fundamental Rights could not be amended at all. Kesavananda revisited that position with the largest bench the Supreme Court of India has ever assembled: 13 judges.\n\nBy a 7–6 majority, the Court arrived at a middle path: Parliament''s power to amend the Constitution under Article 368 is broad, extending even to Fundamental Rights — but it cannot be used to destroy the Constitution''s "basic structure." This is the origin point of the doctrine itself.\n\nThe judgment runs to over 700 pages and is the single most-cited case in Indian constitutional law. You don''t need to read all of it — just remember: 13 judges, 7–6, and "basic structure" born here.'
  )
on conflict (id) do update set
  subject_id = excluded.subject_id,
  parent_topic_id = excluded.parent_topic_id,
  title = excluded.title,
  sort_order = excluded.sort_order,
  preview_snippet = excluded.preview_snippet,
  content = excluded.content;

insert into public.topic_related_topics (topic_id, related_topic_id)
values (1, 3), (1, 4), (3, 1), (4, 1)
on conflict do nothing;

select setval(pg_get_serial_sequence('public.subjects', 'id'), (select max(id) from public.subjects), true);
select setval(pg_get_serial_sequence('public.topics', 'id'), (select max(id) from public.topics), true);
