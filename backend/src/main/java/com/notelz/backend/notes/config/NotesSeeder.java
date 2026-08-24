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

        Subject chemistry = Subject.builder()
                .name("Organic Chemistry")
                .colorHex("#EFC6A4")
                .sortOrder(1)
                .build();
        chemistry.setTopics(List.of(
                topic(chemistry, 0, "SN1 vs SN2 Reactions",
                        "One step or two? Substrate, nucleophile, and solvent decide which path a substitution takes.",
                        """
                        Nucleophilic substitution reactions come in two flavours, and telling them apart is a staple \
                        exam question.

                        SN2 is a single, concerted step: the nucleophile attacks the carbon from the side opposite \
                        the leaving group, flipping the molecule's configuration like an umbrella in the wind \
                        (Walden inversion). It favours primary substrates, strong nucleophiles, and polar aprotic \
                        solvents, and the rate depends on the concentration of both the substrate and the \
                        nucleophile.

                        SN1 happens in two steps: the leaving group departs first, forming a planar carbocation \
                        intermediate, and the nucleophile attacks afterward — from either face, giving a racemic \
                        mixture. It favours tertiary substrates (more stable carbocations), weak nucleophiles, and \
                        polar protic solvents. Its rate depends only on substrate concentration.

                        Quick recall: SN2 = one step, inversion, primary. SN1 = two steps, racemisation, tertiary.
                        """),
                topic(chemistry, 1, "Aromaticity",
                        "Cyclic, planar, fully conjugated, and 4n+2 π electrons — the four conditions every aromatic ring must meet.",
                        """
                        A compound is aromatic if it satisfies four conditions simultaneously: it must be cyclic, \
                        planar, fully conjugated (every ring atom has a p-orbital), and contain 4n+2 π electrons in \
                        that conjugated system, per Hückel's Rule (n = 0, 1, 2…).

                        Benzene is the textbook case: six π electrons (n=1), a flat hexagonal ring, and continuous \
                        p-orbital overlap around the whole ring. This delocalisation gives aromatic compounds \
                        unusual stability compared to what a purely hypothetical, non-delocalised structure would \
                        have.

                        Compounds that are cyclic and conjugated but have 4n π electrons are anti-aromatic — actively \
                        destabilised, not just neutral. Cyclobutadiene is the classic example. And anything that \
                        fails even one condition (non-planar, or broken conjugation) is simply non-aromatic.
                        """),
                topic(chemistry, 2, "Stereochemistry Basics",
                        "Same formula, same connectivity, different arrangement in space — that's the whole idea of a stereoisomer.",
                        """
                        Stereoisomers share molecular formula and the same atom-to-atom connectivity, but differ in \
                        how their atoms are arranged in three-dimensional space.

                        Enantiomers are non-superimposable mirror images of each other — like left and right hands. \
                        They share identical physical properties except for how they rotate plane-polarised light, \
                        and except in how they interact with other chiral molecules (which matters enormously in \
                        biology and drug design).

                        Diastereomers are stereoisomers that are not mirror images of one another. Unlike \
                        enantiomers, they can have genuinely different physical properties — different melting \
                        points, boiling points, solubility — which makes them separable by ordinary means.

                        A carbon with four different substituents is a stereocentre. The R/S system (Cahn-Ingold- \
                        Prelog priority rules) names the configuration at each one: rank the substituents by \
                        priority, orient the lowest-priority group away from you, and read the remaining three — \
                        clockwise is R, counterclockwise is S.
                        """)
        ));

        Subject worldHistory = Subject.builder()
                .name("World History")
                .colorHex("#C7BEDD")
                .sortOrder(2)
                .build();
        worldHistory.setTopics(List.of(
                topic(worldHistory, 0, "Treaty of Westphalia",
                        "The 1648 settlement that ended decades of war — and quietly invented the modern idea of the sovereign state.",
                        """
                        Signed in 1648, the Peace of Westphalia ended the Thirty Years' War in the Holy Roman Empire \
                        and the Eighty Years' War between Spain and the Dutch Republic. It's remembered less for the \
                        wars it ended and more for the political idea it left behind.

                        Westphalia is widely credited as the origin of the modern state system: it established the \
                        principle that each state holds sovereignty over its own territory and domestic affairs, \
                        free from outside interference — including from the Pope or the Holy Roman Emperor, who had \
                        both previously claimed authority above individual rulers.

                        This "Westphalian sovereignty" became the baseline assumption of international relations for \
                        centuries afterward, and it's still the reference point today whenever people discuss \
                        state sovereignty, non-intervention, or the legitimacy of international bodies overriding \
                        domestic governments.
                        """),
                topic(worldHistory, 1, "Causes of WWI",
                        "MAIN: Militarism, Alliances, Imperialism, Nationalism — four long fuses lit by one assassination.",
                        """
                        World War I's causes are commonly grouped under the acronym MAIN: Militarism, Alliances, \
                        Imperialism, and Nationalism.

                        Militarism describes the arms race among major European powers, especially the naval \
                        rivalry between Britain and Germany, which built up both the capacity and the institutional \
                        appetite for war.

                        The alliance system — the Triple Entente (Britain, France, Russia) versus the Triple \
                        Alliance (Germany, Austria-Hungary, Italy) — meant that a conflict between any two members \
                        risked dragging in every other signatory.

                        Imperial competition for colonies and resources bred deep distrust between the powers, while \
                        rising nationalism — especially in the Balkans, the "powder keg of Europe" — created the \
                        volatile local tensions that needed only a spark.

                        That spark came on 28 June 1914: the assassination of Archduke Franz Ferdinand of \
                        Austria-Hungary by a Bosnian Serb nationalist in Sarajevo. Within weeks, the alliance system \
                        turned one regional crisis into a continental war.
                        """),
                topic(worldHistory, 2, "The Cold War: An Overview",
                        "No direct battles between the two superpowers — just fifty years of proxy wars, arms races, and ideology.",
                        """
                        The Cold War (roughly 1947–1991) was a prolonged geopolitical standoff between the United \
                        States and the Soviet Union, defined by ideological conflict — capitalism and liberal \
                        democracy against communism — rather than direct military confrontation between the two \
                        superpowers themselves.

                        Instead, the rivalry played out through proxy wars (Korea, Vietnam, Afghanistan), a nuclear \
                        arms race underpinned by the doctrine of Mutually Assured Destruction, and a global contest \
                        for influence, as both sides courted newly independent nations across Asia, Africa, and \
                        Latin America.

                        Key flashpoints include the Berlin Blockade (1948-49), the Cuban Missile Crisis (1962) — the \
                        closest the world came to full nuclear war — and the eventual fall of the Berlin Wall in \
                        1989, which symbolically marked the beginning of the end.

                        The Soviet Union's dissolution in 1991 formally closed the Cold War, leaving the United \
                        States as the world's sole superpower for the following decade.
                        """)
        ));

        subjectRepository.saveAll(List.of(constitutionalLaw, chemistry, worldHistory));

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
