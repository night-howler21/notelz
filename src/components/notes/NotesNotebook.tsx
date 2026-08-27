"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { logout } from "@/app/actions/auth";
import {
  addTopicToStudyList,
  createStudyList,
  saveTopicAnnotation,
  setTopicSaved,
  updateReadingProgress,
} from "@/app/actions/study-tools";
import { fetchTopic, NotesApiError } from "@/lib/notes-api";
import type { SubjectSummary, TopicDetail } from "@/lib/notes-api";
import type { StudyToolsData } from "@/lib/study-tools-types";
import NotelzMark from "@/components/brand/NotelzMark";
import RuledPaper from "@/components/notes/RuledPaper";
import ChalkboardMenu from "@/components/notes/ChalkboardMenu";
import NotebookToolbar from "@/components/notes/NotebookToolbar";
import NotesWorkspaceSidebar from "@/components/notes/NotesWorkspaceSidebar";
import TopicList from "@/components/notes/TopicList";
import TopicReader from "@/components/notes/TopicReader";

export default function NotesNotebook({
  subjects,
  initialError = null,
  initialStudyTools,
}: {
  subjects: SubjectSummary[];
  initialError?: string | null;
  initialStudyTools: StudyToolsData;
}) {
  const router = useRouter();
  const [activeSubjectId, setActiveSubjectId] = useState<number | null>(null);
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [error, setError] = useState<string | null>(initialError);
  const [ruled, setRuled] = useState(true);
  const [textSize, setTextSize] = useState<"normal" | "large">("normal");
  const [studyTools, setStudyTools] = useState(initialStudyTools);
  const [studyMessage, setStudyMessage] = useState<string | null>(null);
  const latestRequestedTopicId = useRef<number | null>(null);
  const readerRef = useRef<HTMLElement>(null);

  async function openTopic(id: number) {
    latestRequestedTopicId.current = id;
    setError(null);
    try {
      const detail = await fetchTopic(id);
      if (latestRequestedTopicId.current === id) {
        setTopic(detail);
        const currentProgress = studyTools.progress[id] ?? 0;
        const nextProgress = Math.max(currentProgress, 10);
        setStudyTools((current) => ({
          ...current,
          progress: { ...current.progress, [id]: nextProgress },
        }));
        void updateReadingProgress({ topicId: id, progress: nextProgress });
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
    const subject = subjects.find((item) => item.id === id);
    setActiveSubjectId(id);
    setTopic(null);
    setError(null);
    const firstTopic = subject?.topics.at(0);
    if (firstTopic) void openTopic(firstTopic.id);
  }

  function backToSubjects() {
    latestRequestedTopicId.current = null;
    setActiveSubjectId(null);
    setTopic(null);
    setError(initialError);
  }

  async function handleLogout() {
    const result = await logout();
    if (result.ok) {
      router.push("/");
      router.refresh();
    }
  }

  async function toggleSavedTopic() {
    if (!topic) return;
    const currentlySaved = studyTools.savedTopicIds.includes(topic.id);
    const result = await setTopicSaved({ topicId: topic.id, saved: !currentlySaved });
    if (!result.ok) {
      setStudyMessage(result.message);
      return;
    }
    setStudyTools((current) => ({
      ...current,
      savedTopicIds: result.data.saved
        ? [topic.id, ...current.savedTopicIds.filter((id) => id !== topic.id)]
        : current.savedTopicIds.filter((id) => id !== topic.id),
    }));
    setStudyMessage(result.data.saved ? "Note saved." : "Note removed from saved notes.");
  }

  async function handleCreateList(name: string) {
    const result = await createStudyList({ name });
    if (!result.ok) {
      setStudyMessage(result.message);
      return false;
    }
    setStudyTools((current) => ({
      ...current,
      lists: [{ ...result.data, topicIds: [] }, ...current.lists],
    }));
    setStudyMessage(`Created “${result.data.name}”.`);
    return true;
  }

  async function handleAddToList(listId: string) {
    if (!topic) return false;
    const result = await addTopicToStudyList({ listId, topicId: topic.id });
    if (!result.ok) {
      setStudyMessage(result.message);
      return false;
    }
    setStudyTools((current) => ({
      ...current,
      lists: current.lists.map((list) =>
        list.id === listId && !list.topicIds.includes(topic.id)
          ? { ...list, topicIds: [...list.topicIds, topic.id] }
          : list,
      ),
    }));
    setStudyMessage("Added to your study list.");
    return true;
  }

  async function handleSaveAnnotation(content: string) {
    if (!topic) return false;
    const result = await saveTopicAnnotation({ topicId: topic.id, content });
    if (!result.ok) {
      setStudyMessage(result.message);
      return false;
    }
    setStudyTools((current) => ({
      ...current,
      annotations: { ...current.annotations, [topic.id]: content },
    }));
    setStudyMessage("Private note saved.");
    return true;
  }

  const activeSubject = subjects.find((subject) => subject.id === activeSubjectId) ?? null;

  return (
    <div
      className="min-h-screen"
      style={{
        background: activeSubject
          ? "radial-gradient(120% 120% at 20% 0%, #EAF3E5 0%, #D2E6CB 48%, #B4D3AB 100%)"
          : "#D8C6A3",
      }}
    >
      {!activeSubject && (
        <header className="flex items-center justify-between px-4 py-4 sm:px-10 sm:py-5">
          <Link href="/" className="font-serif text-xl font-semibold text-[#3a2a1a]">
            Notelz
          </Link>
          <button
            onClick={handleLogout}
            className="min-h-11 rounded-full border border-[#3a2a1a]/30 bg-white/40 px-4 py-2 text-sm text-[#3a2a1a] backdrop-blur transition hover:bg-white/65 sm:min-h-0"
          >
            Log out
          </button>
        </header>
      )}

      {error && !activeSubject && (
        <p className="px-6 text-sm text-red-700 sm:px-10">{error}</p>
      )}

      {!error && subjects.length === 0 && (
        <p className="py-16 text-center font-hand text-lg text-ink-soft">
          No subjects yet — check back soon.
        </p>
      )}

      {subjects.length > 0 && (!error || activeSubject) && (
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
              key="workspace"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-2 sm:p-4"
            >
              <div className="mx-auto grid min-h-[calc(100svh-1rem)] max-w-[1600px] grid-cols-1 overflow-hidden rounded-2xl border border-mercury-ink/25 bg-paper shadow-2xl shadow-mercury-ink/15 lg:h-[calc(100svh-2rem)] lg:min-h-0 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[17rem_minmax(0,1fr)_18rem]">
                <aside className="flex min-w-0 flex-col border-b border-mercury-ink/15 bg-[#EAF2E5] lg:min-h-0 lg:border-b-0 lg:border-r">
                  <div className="border-b border-mercury-ink/15 p-4">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <Link
                        href="/"
                        className="flex items-center gap-1.5 font-serif text-lg font-semibold text-mercury-ink"
                      >
                        <NotelzMark className="h-5 w-5" />
                        Notelz
                      </Link>
                      <button
                        onClick={backToSubjects}
                        className="rounded-full border border-mercury-ink/20 bg-paper/60 px-3 py-1 font-hand text-sm text-mercury-ink transition hover:bg-paper"
                      >
                        ← All
                      </button>
                    </div>

                    <label className="block">
                      <span className="sr-only">Choose subject</span>
                      <select
                        value={activeSubject.id}
                        onChange={(event) => openSubject(Number(event.target.value))}
                        className="h-10 w-full rounded-lg border border-mercury-ink/15 bg-paper/70 px-3 font-serif text-sm text-mercury-ink outline-none focus:border-mercury-ink/45 focus:ring-2 focus:ring-mercury/35"
                      >
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="min-h-0 flex-1 overflow-y-auto p-4">
                    <TopicList
                      topics={activeSubject.topics}
                      activeTopicId={topic?.id ?? null}
                      onOpenTopic={openTopic}
                    />
                  </div>

                  <blockquote className="hidden border-t border-mercury-ink/15 px-5 py-4 font-caveat text-base text-mercury-ink/65 lg:block">
                    “Small notes become strong arguments.”
                  </blockquote>
                </aside>

                <main
                  ref={readerRef}
                  className="relative flex min-h-[65svh] min-w-0 scroll-mt-2 flex-col bg-paper lg:min-h-0"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -left-2 top-16 z-10 hidden flex-col gap-5 lg:flex"
                  >
                    {Array.from({ length: 18 }, (_, index) => (
                      <span
                        key={index}
                        className="h-2.5 w-4 rounded-full border border-mercury-ink/25 bg-paper-warm shadow-sm"
                      />
                    ))}
                  </div>

                  <NotebookToolbar
                    ruled={ruled}
                    onToggleRuled={() => setRuled((current) => !current)}
                    textSize={textSize}
                    onTextSizeChange={setTextSize}
                    saved={Boolean(topic && studyTools.savedTopicIds.includes(topic.id))}
                    canSave={Boolean(topic)}
                    onToggleSaved={toggleSavedTopic}
                  />

                  {error && (
                    <p className="border-b border-red-900/10 bg-red-50 px-5 py-2 font-hand text-sm text-red-700">
                      {error}
                    </p>
                  )}

                  <RuledPaper
                    ruled={ruled}
                    className="min-h-0 flex-1 overflow-y-auto px-5 py-8 pl-[4.25rem] sm:px-10 sm:py-10 sm:pl-20 lg:px-12 lg:pl-20"
                  >
                    {!topic && (
                      <div className="mx-auto max-w-lg pt-12 text-center">
                        <p className="font-caveat text-3xl text-mercury-ink">Open a page</p>
                        <p className="mt-2 font-hand text-lg text-ink-soft">
                          Choose a topic from the contents to start reading.
                        </p>
                      </div>
                    )}
                    {topic && (
                      <TopicReader topic={topic} onOpenTopic={openTopic} textSize={textSize} />
                    )}
                  </RuledPaper>

                  <footer className="flex min-h-11 items-center justify-between gap-4 border-t border-mercury-ink/15 bg-paper-warm/65 px-4 font-hand text-xs text-ink-soft/60 sm:px-6">
                    <span>Made for last-minute clarity.</span>
                    <span>{topic ? "1 note open" : "Choose a note"}</span>
                  </footer>
                </main>

                <NotesWorkspaceSidebar
                  subjects={subjects}
                  activeSubject={activeSubject}
                  activeTopicId={topic?.id ?? null}
                  onOpenSubject={openSubject}
                  onOpenTopic={openTopic}
                  onLogout={handleLogout}
                  studyTools={studyTools}
                  message={studyMessage}
                  onCreateList={handleCreateList}
                  onAddToList={handleAddToList}
                  onSaveAnnotation={handleSaveAnnotation}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
