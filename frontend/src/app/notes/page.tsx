"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { fetchSubjects, fetchTopic } from "@/lib/notes-api";
import type { SubjectSummary, TopicDetail } from "@/lib/notes-api";
import RuledPaper from "@/components/notes/RuledPaper";
import SubjectTabs from "@/components/notes/SubjectTabs";
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
      .then((data) => {
        setSubjects(data);
        setActiveSubjectId((current) => current ?? data[0]?.id ?? null);
      })
      .catch(() => setError("Couldn't load your notes right now."));
  }, [token]);

  async function openTopic(id: number) {
    if (!token) return;
    try {
      const detail = await fetchTopic(id, token);
      setTopic(detail);
    } catch {
      setError("Couldn't load that note right now.");
    }
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

      <main className="flex flex-col gap-6 px-6 pb-10 sm:px-10 lg:flex-row lg:items-start">
        {subjects && subjects.length > 0 && (
          <SubjectTabs
            subjects={subjects}
            activeId={activeSubjectId}
            onSelect={(id) => {
              setActiveSubjectId(id);
              setTopic(null);
            }}
          />
        )}

        <RuledPaper className="flex h-[75vh] w-full flex-col overflow-hidden rounded-2xl border border-mercury-ink/10 shadow-xl shadow-mercury-ink/10">
          {error && <p className="p-8 text-sm text-red-600">{error}</p>}

          {!error && !subjects && (
            <p className="p-8 font-hand text-lg text-ink-soft">Opening your notebook…</p>
          )}

          {!error && subjects && subjects.length === 0 && (
            <p className="p-8 font-hand text-lg text-ink-soft">
              No subjects yet — check back soon.
            </p>
          )}

          {!error && activeSubject && !topic && (
            <TopicList
              subjectName={activeSubject.name}
              topics={activeSubject.topics}
              onOpenTopic={openTopic}
            />
          )}

          {!error && topic && <TopicReader topic={topic} onBack={() => setTopic(null)} />}
        </RuledPaper>
      </main>
    </div>
  );
}
