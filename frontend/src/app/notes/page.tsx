"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getSession } from "@/lib/session";
import { fetchSubjects, fetchTopic } from "@/lib/notes-api";
import type { SubjectSummary, TopicDetail } from "@/lib/notes-api";
import RuledPaper from "@/components/notes/RuledPaper";
import Corkboard from "@/components/notes/Corkboard";
import TopicList from "@/components/notes/TopicList";
import TopicReader from "@/components/notes/TopicReader";

export default function NotesPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<SubjectSummary[] | null>(null);
  const [activeSubjectId, setActiveSubjectId] = useState<number | null>(null);
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setToken(session.token);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    fetchSubjects(token)
      .then(setSubjects)
      .catch(() => setError("Couldn't load your notes right now."));
  }, [token]);

  const latestRequestedTopicId = useRef<number | null>(null);

  async function openTopic(id: number) {
    if (!token) return;
    latestRequestedTopicId.current = id;
    try {
      const detail = await fetchTopic(id, token);
      if (latestRequestedTopicId.current === id) {
        setTopic(detail);
      }
    } catch {
      if (latestRequestedTopicId.current === id) {
        setError("Couldn't load that note right now.");
      }
    }
  }

  function openSubject(id: number) {
    setActiveSubjectId(id);
    setTopic(null);
  }

  function backToSubjects() {
    setActiveSubjectId(null);
    setTopic(null);
  }

  const activeSubject = subjects?.find((s) => s.id === activeSubjectId) ?? null;

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)",
      }}
    >
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/dashboard" className="font-serif text-xl font-semibold text-mercury-ink">
          Notelz
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-mercury-ink/30 bg-paper/60 px-4 py-2 text-sm text-mercury-ink backdrop-blur transition hover:bg-paper/85"
        >
          ← Dashboard
        </Link>
      </header>

      <main className="px-6 pb-14 sm:px-10">
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!error && !subjects && (
          <p className="py-16 text-center font-hand text-lg text-ink-soft">
            Opening your notebook…
          </p>
        )}

        {!error && subjects && subjects.length === 0 && (
          <p className="py-16 text-center font-hand text-lg text-ink-soft">
            No subjects yet — check back soon.
          </p>
        )}

        {!error && subjects && subjects.length > 0 && (
          <AnimatePresence mode="wait">
            {!activeSubject && (
              <motion.div
                key="corkboard"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Corkboard subjects={subjects} onSelect={openSubject} />
              </motion.div>
            )}

            {activeSubject && (
              <motion.div
                key="notebook"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* plain site chrome — not part of the notebook */}
                <div className="relative mb-6 flex items-center justify-center">
                  <button
                    onClick={backToSubjects}
                    className="absolute left-0 rounded-full border border-mercury-ink/30 bg-paper/60 px-4 py-2 text-sm text-mercury-ink backdrop-blur transition hover:bg-paper/85"
                  >
                    ← All subjects
                  </button>
                  <h1 className="font-serif text-3xl text-mercury-ink sm:text-4xl">
                    {activeSubject.name}
                  </h1>
                </div>

                {/* the notebook itself — only this part gets the ruled-paper treatment */}
                <RuledPaper className="overflow-hidden rounded-2xl border border-mercury-ink/10 shadow-xl shadow-mercury-ink/10">
                  {activeSubject.topics.length === 0 ? (
                    <p className="py-16 text-center font-hand text-xl text-ink-soft">
                      No notes here yet — this subject is still being written.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-10 p-8 sm:p-10 lg:flex-row lg:items-start">
                      <aside className="shrink-0 lg:w-80">
                        <TopicList
                          topics={activeSubject.topics}
                          activeTopicId={topic?.id ?? null}
                          onOpenTopic={openTopic}
                        />
                      </aside>

                      <div className="min-h-[50vh] flex-1">
                        {!topic && (
                          <p className="px-4 pt-16 text-center font-hand text-xl text-ink-soft">
                            Pick a topic on the left to start reading.
                          </p>
                        )}
                        {topic && <TopicReader topic={topic} onOpenTopic={openTopic} />}
                      </div>
                    </div>
                  )}
                </RuledPaper>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
