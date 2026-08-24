package com.notelz.backend.notes.config;

import com.notelz.backend.notes.model.Subject;
import com.notelz.backend.notes.model.Topic;
import com.notelz.backend.notes.repository.SubjectRepository;
import com.notelz.backend.notes.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class NotesSeeder implements CommandLineRunner {

    private final SubjectRepository subjectRepository;
    private final TopicRepository topicRepository;

    @Override
    public void run(String... args) {
        if (subjectRepository.count() > 0) {
            return;
        }

        Subject constitutionalLaw = Subject.builder()
                .name("Constitutional Law")
                .colorHex("#A9CBA0")
                .sortOrder(0)
                .build();

        Topic doctrineOfEclipse =
                topic(constitutionalLaw, 0, "Doctrine of Eclipse",
                        "A pre-Constitution law inconsistent with fundamental rights isn't dead — just eclipsed, until the shadow lifts.",
                        """
                        The Doctrine of Eclipse holds that a law in force before the Constitution came into effect, \
                        which conflicts with a Fundamental Right, is not wiped out entirely. Instead, it becomes \
                        unenforceable — "eclipsed" — for as long as the conflict lasts, without being erased from \
                        the statute book.

                        If the Fundamental Right in question is later amended so the conflict disappears, the \
                        eclipsed law automatically springs back into full force, without needing to be re-enacted. \
                        The shadow lifts, and the law is visible again.

                        This doctrine applies specifically to pre-Constitutional laws under Article 13(1). It was \
                        established in Bhikaji Narain Dhakras v. State of Madhya Pradesh (1955), building on the \
                        reasoning first explored in Keshavan Madhava Menon v. State of Bombay (1951).

                        Key distinction to remember: the doctrine applies only to laws that existed before the \
                        Constitution. A post-Constitution law that violates a Fundamental Right is void from its \
                        inception under Article 13(2) — it is stillborn, not eclipsed, and a later amendment cannot \
                        revive it. It would need to be re-enacted entirely.
                        """);

        Topic bhikajiCase = subtopic(constitutionalLaw, doctrineOfEclipse, 0,
                "Bhikaji Narain Dhakras v. State of MP (1955)",
                "The case that gave the Doctrine of Eclipse its name — and showed a law springing back to life.",
                """
                Case note. The Central Provinces and Berar Motor Vehicles (Amendment) Act, 1947 authorised a state \
                monopoly over motor transport, conflicting with the newly-guaranteed right to carry on any \
                occupation, trade, or business under Article 19(1)(g).

                When the Constitution commenced in 1950, the Act became unenforceable against citizens for that \
                conflict — but it was not struck down outright, since it predated the Constitution and fell under \
                Article 13(1) rather than 13(2).

                In 1951, the First Amendment added Article 19(6), permitting the State to create such monopolies. \
                The conflict disappeared, and the Supreme Court held that the Act was automatically freed from its \
                eclipse and became fully enforceable again — without Parliament needing to re-pass it.

                This is the case to cite whenever you explain the Doctrine of Eclipse: it is the clearest real-world \
                example of a law being "revived," rather than merely upheld or struck down.
                """);

        Topic doctrineOfSeverability =
                topic(constitutionalLaw, 1, "Doctrine of Severability",
                        "When only part of a law violates a fundamental right, courts strike down that part alone — if it can stand without the rest.",
                        """
                        The Doctrine of Severability, drawn from Article 13, says that when a provision of a law is \
                        unconstitutional, only the offending part is struck down — provided it can be separated from \
                        the valid remainder without changing the character of the law.

                        The test is whether the legislature would have enacted the valid part at all, standing alone, \
                        without the invalid portion. If the valid and invalid parts are so mixed together that they \
                        form one inseparable whole, the entire law falls.

                        A.K. Gopalan v. State of Madras (1950) is the classic illustration: most of the Preventive \
                        Detention Act was upheld, but Section 14 — which barred courts from examining the grounds of \
                        detention — was struck down alone, since the rest of the Act could function perfectly well \
                        without it.

                        Contrast this with a law entirely built around a single unconstitutional idea: there, nothing \
                        survives, because there is no independently workable remainder to sever.
                        """);

        Topic basicStructure =
                topic(constitutionalLaw, 2, "Basic Structure Doctrine",
                        "Parliament can amend the Constitution — but never so far as to destroy its identity.",
                        """
                        The Basic Structure Doctrine holds that while Parliament has wide power under Article 368 to \
                        amend the Constitution, it cannot alter or destroy its "basic structure" — the core \
                        framework that gives the Constitution its identity.

                        It was laid down in the landmark case Kesavananda Bharati v. State of Kerala (1973), decided \
                        by a wafer-thin 7–6 majority in a 13-judge bench, the largest ever assembled by the Supreme \
                        Court of India. The Court did not give an exhaustive list of what counts as "basic," but \
                        later judgments have included: the supremacy of the Constitution, the rule of law, judicial \
                        review, separation of powers, federalism, and free and fair elections.

                        The doctrine has repeatedly been the deciding factor in major cases — most notably Indira \
                        Gandhi v. Raj Narain (1975), where a constitutional amendment nullifying a specific election \
                        judgment was struck down for violating free and fair elections as part of the basic \
                        structure.

                        Exam tip: this is the single most-cited doctrine in Indian constitutional law essays — always \
                        anchor it to Kesavananda Bharati and be ready to name at least three "basic features."
                        """);

        Topic kesavanandaCase = subtopic(constitutionalLaw, basicStructure, 0,
                "Kesavananda Bharati v. State of Kerala (1973)",
                "Thirteen judges, a 7–6 split, and the case that decided Parliament's amending power has a ceiling.",
                """
                Case note. Kesavananda Bharati, head of a religious institution in Kerala, challenged land reform \
                legislation that restricted the management of his institution's property — but the case grew into \
                a direct test of how far Parliament could go in amending the Constitution.

                It followed Golaknath v. State of Punjab (1967), where the Court had held Fundamental Rights could \
                not be amended at all. Kesavananda revisited that position with the largest bench the Supreme Court \
                of India has ever assembled: 13 judges.

                By a 7–6 majority, the Court arrived at a middle path: Parliament's power to amend the Constitution \
                under Article 368 is broad, extending even to Fundamental Rights — but it cannot be used to destroy \
                the Constitution's "basic structure." This is the origin point of the doctrine itself.

                The judgment runs to over 700 pages and is the single most-cited case in Indian constitutional law. \
                You don't need to read all of it — just remember: 13 judges, 7–6, and "basic structure" born here.
                """);

        List<Topic> constitutionalLawTopics = new ArrayList<>(List.of(
                doctrineOfEclipse, bhikajiCase, doctrineOfSeverability, basicStructure, kesavanandaCase
        ));
        constitutionalLaw.setTopics(constitutionalLawTopics);

        Subject torts = Subject.builder()
                .name("Torts")
                .colorHex("#F0D89A")
                .sortOrder(1)
                .topics(new ArrayList<>())
                .build();

        Subject contractLaw = Subject.builder()
                .name("Contract Law")
                .colorHex("#A8C8DE")
                .sortOrder(2)
                .topics(new ArrayList<>())
                .build();

        Subject familyLaw = Subject.builder()
                .name("Family Law")
                .colorHex("#E8B4C0")
                .sortOrder(3)
                .topics(new ArrayList<>())
                .build();

        subjectRepository.saveAll(List.of(constitutionalLaw, torts, contractLaw, familyLaw));

        // second pass: wire up cross-references now that topics have generated IDs
        doctrineOfEclipse.setRelatedTopicIds(List.of(doctrineOfSeverability.getId(), basicStructure.getId()));
        doctrineOfSeverability.setRelatedTopicIds(List.of(doctrineOfEclipse.getId()));
        basicStructure.setRelatedTopicIds(List.of(doctrineOfEclipse.getId()));
        topicRepository.saveAll(List.of(doctrineOfEclipse, doctrineOfSeverability, basicStructure));
    }

    private Topic topic(Subject subject, int order, String title, String preview, String content) {
        return Topic.builder()
                .subject(subject)
                .sortOrder(order)
                .title(title)
                .previewSnippet(preview)
                .content(content.strip())
                .build();
    }

    private Topic subtopic(Subject subject, Topic parent, int order, String title, String preview, String content) {
        return Topic.builder()
                .subject(subject)
                .parentTopic(parent)
                .sortOrder(order)
                .title(title)
                .previewSnippet(preview)
                .content(content.strip())
                .build();
    }
}
