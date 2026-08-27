"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "@/app/actions/auth";
import { fetchTopic, NotesApiError } from "@/lib/notes-api";
import type { SubjectSummary, TopicDetail } from "@/lib/notes-api";
import RuledPaper from "@/components/notes/RuledPaper";
import ChalkboardMenu from "@/components/notes/ChalkboardMenu";
import TopicList from "@/components/notes/TopicList";
import TopicReader from "@/components/notes/TopicReader";

export default function NotesNotebook({
  subjects,
  initialError = null,
}: {
  subjects: SubjectSummary[];
  initialError?: string | null;
}) {
  const router = useRouter();
  const [activeSubjectId, setActiveSubjectId] = useState<number | null>(null);
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [error, setError] = useState<string | null>(initialError);

  const latestRequestedTopicId = useRef<number | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  async function openTopic(id: number) {
    latestRequestedTopicId.current = id;
    try {
      const detail = await fetchTopic(id);
      if (latestRequestedTopicId.current === id) {
        setTopic(detail);
        if (window.matchMedia("(max-width: 1023px)").matches) {
          const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          requestAnimationFrame(() => {
            readerRef.current?.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            });
          });
        }
      }
    } catch (requestError) {
      if (requestError instanceof NotesApiError && requestError.status === 401) {
        router.replace("/login");
        return;
      }
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

  async function handleLogout() {
    const result = await logout();
    if (result.ok) {
      router.push("/");
      router.refresh();
    }
  }

  const activeSubject = subjects.find((s) => s.id === activeSubjectId) ?? null;

  return (
    <div
      className="min-h-screen"
      style={{
        background: activeSubject
          ? "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 45%, #B4D3AB 100%)"
          : "#D8C6A3",
      }}
    >
      <header className="flex items-center justify-between px-4 py-4 sm:px-10 sm:py-5">
        <Link
          href="/"
          className={`font-serif text-xl font-semibold ${
            activeSubject ? "text-mercury-ink" : "text-[#3a2a1a]"
          }`}
        >
          Notelz
        </Link>
        <button
          onClick={handleLogout}
          className={`min-h-11 rounded-full border px-4 py-2 text-sm backdrop-blur transition sm:min-h-0 ${
            activeSubject
              ? "border-mercury-ink/30 bg-paper/60 text-mercury-ink hover:bg-paper/85"
              : "border-[#3a2a1a]/30 bg-white/40 text-[#3a2a1a] hover:bg-white/65"
          }`}
        >
          Log out
        </button>
      </header>

      {error && <p className="px-6 text-sm text-red-600 sm:px-10">{error}</p>}

      {!error && subjects.length === 0 && (
        <p className="py-16 text-center font-hand text-lg text-ink-soft">
          No subjects yet — check back soon.
        </p>
      )}

      {!error && subjects.length > 0 && (
        <AnimatePresence mode="wait">
          {!activeSubject && (
            <motion.div
              key="chalkboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ChalkboardMenu subjects={subjects} onSelect={openSubject} />
            </motion.div>
          )}

          {activeSubject && (
            <motion.div
              key="notebook"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="px-4 pb-10 sm:px-10 sm:pb-14"
            >
              {/* plain site chrome — not part of the notebook */}
              <div className="mb-5 flex flex-col items-start gap-3 sm:relative sm:mb-6 sm:flex-row sm:items-center sm:justify-center">
                <button
                  onClick={backToSubjects}
                  className="min-h-11 rounded-full border border-mercury-ink/30 bg-paper/60 px-4 py-2 text-sm text-mercury-ink backdrop-blur transition hover:bg-paper/85 sm:absolute sm:left-0 sm:min-h-0"
                >
                  ← All subjects
                </button>
                <h1 className="w-full text-center font-serif text-2xl leading-tight text-mercury-ink sm:text-4xl">
                  {activeSubject.name}
                </h1>
              </div>

              {activeSubject.topics.length === 0 ? (
                <p className="py-16 text-center font-hand text-xl text-ink-soft">
                  No notes here yet — this subject is still being written.
                </p>
              ) : (
                <div className="mx-auto flex max-w-5xl flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
                  {/* plain chrome — the topic list sits on the page background, not the notebook */}
                  <aside className="min-w-0 shrink-0 lg:w-72">
                    <TopicList
                      topics={activeSubject.topics}
                      activeTopicId={topic?.id ?? null}
                      onOpenTopic={openTopic}
                    />
                  </aside>

                  {/* the notebook itself — only the actual reading pane gets the ruled-paper treatment */}
                  <div ref={readerRef} className="min-w-0 scroll-mt-4 lg:flex-1">
                    <RuledPaper className="min-h-[50vh] overflow-hidden rounded-xl border border-mercury-ink/10 p-4 shadow-xl shadow-mercury-ink/10 sm:rounded-2xl sm:p-8">
                      {!topic && (
                        <p className="px-2 pt-8 text-center font-hand text-lg text-ink-soft sm:px-4 sm:text-xl">
                  Pick a topic <span className="lg:hidden">above</span>
                  <span className="hidden lg:inline">on the left</span> to start
                  reading.
                        </p>
                      )}
                      {topic && <TopicReader topic={topic} onOpenTopic={openTopic} />}
                    </RuledPaper>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
