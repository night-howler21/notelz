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

insert into public.topics
  (id, subject_id, parent_topic_id, title, sort_order, preview_snippet, content)
values
  (
    10, 2, null, 'Negligence', 0,
    'Negligence asks whether a legal duty of care was breached and whether that breach caused legally recognised damage.',
    E'Negligence is built around three connected questions: did the defendant owe the claimant a duty of care, was that duty breached, and did the breach cause actionable damage? Carelessness alone is not enough; the law must recognise a duty in the circumstances.\n\nBreach is measured against the conduct expected from a reasonable person in the same situation. The court considers the probability and seriousness of harm, the practicality of precautions, and the purpose of the activity.\n\nCausation has two stages. Factual causation usually asks whether the harm would have occurred but for the breach. Legal causation then asks whether the kind of harm was too remote and whether any later event broke the chain.\n\nExam method: identify duty, breach, factual causation, remoteness, defences, and damage separately. A strong answer applies each element to the facts instead of treating negligence as one broad conclusion.'
  ),
  (
    11, 2, null, 'Vicarious Liability', 1,
    'An employer may be liable for a tort committed by an employee when the wrong is sufficiently connected with the employment.',
    E'Vicarious liability makes one person answer for the tort of another because of their relationship and the connection between the tort and the work entrusted to the wrongdoer. The most common setting is the employer-employee relationship.\n\nThe first issue is status: was the tortfeasor an employee or in a relationship sufficiently similar to employment? Control matters, but modern analysis also looks at integration, economic dependence, who supplied equipment, and who bore business risk.\n\nThe second issue is connection. An employer is ordinarily liable for an authorised act performed negligently and may also be liable for an unauthorised mode of doing authorised work. A purely personal venture outside the field of employment is less likely to qualify.\n\nExam cue: separate the employee-status inquiry from the close-connection inquiry, then consider whether the employer has any direct negligence of its own.'
  ),
  (
    12, 2, null, 'Strict and Absolute Liability', 2,
    'Strict liability begins with dangerous escape; Indian absolute liability removes the traditional exceptions for hazardous enterprises.',
    E'The rule associated with Rylands v. Fletcher imposes strict liability where a person brings onto land something likely to cause mischief if it escapes, makes a non-natural or special use of the land, and the thing escapes and causes damage.\n\nTraditional strict liability recognises exceptions, including the claimant''s own default, an act of God, an act of a stranger in appropriate circumstances, statutory authority, and consent or common benefit. Each exception must be tested against the facts.\n\nIndian constitutional tort jurisprudence developed a stricter rule for enterprises engaged in hazardous or inherently dangerous activities. The enterprise owes an absolute and non-delegable duty to the community and cannot rely on the Rylands exceptions when harm results from that activity.\n\nKey distinction: strict liability is an escape-based private-law rule with recognised exceptions; absolute liability for hazardous industry is a distinct Indian rule designed around enterprise responsibility.'
  ),
  (
    13, 2, 12, 'M.C. Mehta v. Union of India (Oleum Gas Leak)', 0,
    'The Supreme Court formulated absolute liability for enterprises carrying on hazardous or inherently dangerous activities.',
    E'The Oleum Gas Leak litigation arose after gas escaped from a Delhi industrial unit. The Supreme Court used the proceedings to reconsider whether the nineteenth-century rule in Rylands v. Fletcher adequately protected people exposed to modern hazardous industry.\n\nThe Court held that an enterprise conducting a hazardous or inherently dangerous activity owes an absolute and non-delegable duty to ensure that no one is harmed by it. If harm occurs, the enterprise is liable regardless of reasonable care.\n\nThe traditional exceptions to strict liability do not apply to this absolute duty. Compensation should also relate to the magnitude and capacity of the enterprise so that liability has a deterrent effect.\n\nRemember the pairing: Rylands v. Fletcher for strict liability; M.C. Mehta for the Indian rule of absolute liability for hazardous enterprises.'
  ),
  (
    20, 3, null, 'Formation of a Contract', 0,
    'A contract begins with agreement, but Section 10 requires free consent, competent parties, lawful consideration and a lawful object.',
    E'Section 2 of the Indian Contract Act supplies the basic vocabulary: a proposal accepted becomes a promise; promises forming consideration for each other are an agreement; and an agreement enforceable by law is a contract.\n\nSections 3 to 9 govern communication, acceptance, revocation, and express or implied promises. Acceptance must be absolute and unqualified, and it must be communicated or manifested in a legally recognised way.\n\nSection 10 identifies the central requirements for enforceability: free consent of parties competent to contract, lawful consideration, a lawful object, and an agreement not expressly declared void. Other laws may also require writing, witnesses, or registration.\n\nExam sequence: proposal, valid acceptance, consideration, intention and enforceability, capacity, free consent, legality, certainty, and any required formality.'
  ),
  (
    21, 3, null, 'Free Consent', 1,
    'Consent is free only when it is not caused by coercion, undue influence, fraud, misrepresentation, or mistake.',
    E'Section 13 says parties consent when they agree upon the same thing in the same sense. Section 14 then asks whether that consent is free from coercion, undue influence, fraud, misrepresentation, and mistake.\n\nCoercion focuses on prohibited threats or unlawful detention of property. Undue influence examines whether one party was able to dominate the will of another and used that position to obtain an unfair advantage.\n\nFraud involves intentional deception, while misrepresentation covers specified false assertions or conduct without the same fraudulent intent. The remedy and burden of proof depend on the category established.\n\nExam tip: identify the exact vitiating factor before discussing effect. Some defects make a contract voidable at the option of the affected party; a qualifying bilateral mistake of fact may make the agreement void.'
  ),
  (
    22, 3, null, 'Remedies for Breach', 2,
    'Contract damages compensate loss arising naturally from breach or within the parties'' contemplation, but not remote loss.',
    E'Section 73 provides compensation for loss or damage that naturally arose in the usual course from the breach, or that the parties knew at formation was likely to result. Remote and indirect loss is excluded.\n\nThe claimant must connect the breach to the loss and take reasonable steps to reduce avoidable damage. Mitigation does not erase the breach; it limits recovery for loss that reasonable action could have prevented.\n\nSection 74 addresses a sum named in the contract or another penalty stipulation. The court awards reasonable compensation within the statutory ceiling rather than mechanically enforcing the stated amount in every case.\n\nStructure a remedy answer around the protected expectation, causation, remoteness, mitigation, proof of loss, and any agreed damages clause.'
  ),
  (
    23, 3, 22, 'Hadley v. Baxendale and Remoteness', 0,
    'The classic remoteness framework separates ordinary losses from special losses communicated when the contract was made.',
    E'Hadley v. Baxendale is the classic source of the two-limb approach to remoteness in contract damages. Loss may be recoverable when it arises naturally in the ordinary course, or when special circumstances made it reasonably contemplated by both parties at formation.\n\nSpecial loss depends on communication. If unusual circumstances were not disclosed, the defendant could not price or assume that exceptional risk when making the contract.\n\nSection 73 of the Indian Contract Act reflects the same core distinction between ordinary or contemplated loss and remote or indirect loss. Its statutory illustrations help show how the rule operates.\n\nExam cue: state which limb applies, identify what was known at formation, and distinguish remoteness from factual causation and mitigation.'
  ),
  (
    30, 4, null, 'Conditions for a Hindu Marriage', 0,
    'Section 5 sets the statutory conditions concerning an existing spouse, capacity, age, prohibited relationships, and sapinda relationships.',
    E'Section 5 of the Hindu Marriage Act lists the conditions for a Hindu marriage between two Hindus. Neither party may have a spouse living at the time of marriage.\n\nThe section also addresses capacity to give valid consent and specified mental-disorder conditions. It sets minimum ages of twenty-one for the bridegroom and eighteen for the bride.\n\nThe parties must not be within prohibited degrees or be sapindas of each other unless a governing custom or usage permits the marriage. Sections 3 and 5 should be read together for the statutory definitions.\n\nExam method: test each Section 5 condition separately, then link the particular breach to the correct consequence under Sections 11, 12, 17, or 18 rather than assuming every breach has the same effect.'
  ),
  (
    31, 4, null, 'Void and Voidable Marriages', 1,
    'Sections 11 and 12 distinguish marriages void from inception from marriages that remain effective until annulled.',
    E'Section 11 treats a post-Act marriage as void when it contravenes the specified Section 5 conditions concerning a living spouse, prohibited degrees, or sapinda relationship. A decree records the nullity rather than creating it.\n\nSection 12 deals with voidable marriages. The listed grounds include non-consummation owing to impotence, contravention of the relevant capacity condition, consent obtained by force or qualifying fraud, and specified pre-marriage pregnancy circumstances.\n\nA voidable marriage remains legally effective unless and until the competent court annuls it. Section 12 also contains timing, knowledge, and post-discovery conduct restrictions for particular grounds.\n\nKey distinction: void means no valid marital status from inception in law; voidable means valid unless the entitled party obtains annulment.'
  ),
  (
    32, 4, null, 'Divorce under the Hindu Marriage Act', 2,
    'Section 13 provides fault and breakdown-related grounds, while Section 13B separately governs divorce by mutual consent.',
    E'Section 13 of the Hindu Marriage Act sets out grounds on which a spouse may petition for divorce. The statutory grounds and their requirements must be applied precisely rather than reduced to a general claim that the marriage has failed.\n\nThe provision includes grounds such as adultery, cruelty, and desertion, alongside other specified circumstances. Desertion carries a statutory period and includes both physical separation and the required intention.\n\nSection 13B provides a separate route by mutual consent. It requires the parties to meet the statutory conditions, present the petition together, and continue to consent when the court considers the later motion, subject to the law on waiver of the waiting period.\n\nExam tip: identify whether the problem concerns a unilateral Section 13 petition or a joint Section 13B petition, then address conditions, proof, defences, and available relief.'
  ),
  (
    33, 4, 32, 'Divorce by Mutual Consent: Section 13B', 0,
    'Mutual-consent divorce depends on statutory separation, joint presentation, continuing consent, and the court''s decree.',
    E'Section 13B applies where the parties have lived separately for the statutory period, have not been able to live together, and mutually agree that the marriage should be dissolved.\n\nThe petition is presented jointly. The later motion and the court''s inquiry confirm that consent continues and that the statutory conditions are satisfied before a decree is granted.\n\nThe waiting period serves a reconciliatory purpose, but Supreme Court authority treats it as capable of waiver in appropriate cases when the relevant conditions are met. Waiver is not automatic.\n\nPractical distinction: settlement terms about maintenance, custody, and property may support a mutual-consent process, but the marriage ends only when the court grants the decree.'
  )
on conflict (id) do update set
  subject_id = excluded.subject_id,
  parent_topic_id = excluded.parent_topic_id,
  title = excluded.title,
  sort_order = excluded.sort_order,
  preview_snippet = excluded.preview_snippet,
  content = excluded.content;

insert into public.topic_related_topics (topic_id, related_topic_id)
values
  (1, 3), (1, 4), (3, 1), (4, 1),
  (10, 12), (12, 10),
  (20, 21), (20, 22), (21, 20), (22, 20),
  (30, 31), (30, 32), (31, 30), (32, 30)
on conflict do nothing;

select setval(pg_get_serial_sequence('public.subjects', 'id'), (select max(id) from public.subjects), true);
select setval(pg_get_serial_sequence('public.topics', 'id'), (select max(id) from public.topics), true);
