"use client";

import { useMemo, useState } from "react";
import type { SubjectSummary, TopicSummary } from "@/lib/notes-api";
import type { StudyToolsData } from "@/lib/study-tools-types";

function flattenTopics(topics: TopicSummary[]): TopicSummary[] {
  return topics.flatMap((topic) => [topic, ...flattenTopics(topic.subtopics)]);
}

function PrivateAnnotationEditor({
  topicId,
  initialContent,
  progress,
  onSave,
}: {
  topicId: number | null;
  initialContent: string;
  progress: number;
  onSave: (content: string) => Promise<boolean>;
}) {
  const [content, setContent] = useState(initialContent);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!topicId) return;
    setSaving(true);
    await onSave(content);
    setSaving(false);
  }

  return (
    <>
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        disabled={!topicId}
        maxLength={10000}
        rows={3}
        placeholder={topicId ? "Write an exam cue or reminder..." : "Open a topic first"}
        className="mt-3 w-full resize-y rounded-md border border-mercury-ink/20 bg-paper px-2.5 py-2 font-hand text-sm text-ink outline-none focus:border-mercury-ink/45 disabled:opacity-50"
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="font-hand text-xs text-mercury-ink/55">
          {topicId ? `${progress}% started` : "No note open"}
        </span>
        <button
          type="button"
          onClick={save}
          disabled={saving || !topicId}
          className="rounded-md bg-mercury/55 px-3 py-1 font-hand text-sm text-mercury-ink disabled:opacity-40"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default function NotesWorkspaceSidebar({
  subjects,
  activeSubject,
  activeTopicId,
  studyTools,
  message,
  onOpenSubject,
  onOpenTopic,
  onLogout,
  onCreateList,
  onAddToList,
  onSaveAnnotation,
}: {
  subjects: SubjectSummary[];
  activeSubject: SubjectSummary;
  activeTopicId: number | null;
  studyTools: StudyToolsData;
  message: string | null;
  onOpenSubject: (id: number) => void;
  onOpenTopic: (id: number) => void;
  onLogout: () => void;
  onCreateList: (name: string) => Promise<boolean>;
  onAddToList: (listId: string) => Promise<boolean>;
  onSaveAnnotation: (content: string) => Promise<boolean>;
}) {
  const [listName, setListName] = useState("");
  const [selectedListId, setSelectedListId] = useState("");
  const [busy, setBusy] = useState(false);
  const allTopics = useMemo(
    () => subjects.flatMap((subject) => flattenTopics(subject.topics)),
    [subjects],
  );
  const topicById = useMemo(() => new Map(allTopics.map((item) => [item.id, item])), [allTopics]);
  const savedTopics = studyTools.savedTopicIds
    .map((id) => topicById.get(id))
    .filter((item): item is TopicSummary => Boolean(item));

  async function submitList(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!listName.trim()) return;
    setBusy(true);
    const created = await onCreateList(listName);
    if (created) setListName("");
    setBusy(false);
  }

  async function addToList() {
    if (!selectedListId || !activeTopicId) return;
    setBusy(true);
    await onAddToList(selectedListId);
    setBusy(false);
  }

  const sectionClass = "rounded-xl border border-mercury-ink/15 bg-paper/75 p-4 shadow-sm";

  return (
    <aside className="grid gap-3 border-t border-mercury-ink/15 bg-[#F2ECDD] p-3 sm:grid-cols-2 lg:col-span-2 lg:p-4 xl:col-span-1 xl:flex xl:min-h-0 xl:flex-col xl:overflow-y-auto xl:border-l xl:border-t-0">
      <section className={sectionClass}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="font-serif text-base text-mercury-ink">My Library</p>
            <p className="font-hand text-xs text-ink-soft/65">{subjects.length} subjects</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-full border border-mercury-ink/20 px-3 py-1 font-hand text-sm text-mercury-ink transition hover:bg-mercury/30"
          >
            Log out
          </button>
        </div>
        <ul className="space-y-1">
          {subjects.map((subject) => {
            const active = subject.id === activeSubject.id;
            return (
              <li key={subject.id}>
                <button
                  onClick={() => onOpenSubject(subject.id)}
                  className={`flex min-h-9 w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-hand text-sm transition ${
                    active ? "bg-mercury/45 text-mercury-ink" : "text-ink-soft hover:bg-paper"
                  }`}
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-sm border border-mercury-ink/20"
                    style={{ backgroundColor: subject.colorHex }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 truncate">{subject.name}</span>
                  {active && <span className="text-gold" aria-label="Current subject">★</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={sectionClass}>
        <div className="mb-3 flex items-center justify-between">
          <p className="font-serif text-base text-mercury-ink">Saved notes</p>
          <span className="font-hand text-xs text-ink-soft/60">{savedTopics.length}</span>
        </div>
        {savedTopics.length > 0 ? (
          <ul className="space-y-1.5">
            {savedTopics.slice(0, 5).map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onOpenTopic(item.id)}
                  className={`flex min-h-9 w-full items-center gap-2 rounded-md px-2 py-1.5 text-left font-hand text-sm transition ${
                    item.id === activeTopicId ? "bg-peach/35 text-mercury-ink" : "text-ink-soft hover:bg-paper"
                  }`}
                >
                  <span aria-hidden="true" className="text-coral">◆</span>
                  <span className="line-clamp-1">{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-hand text-sm text-ink-soft/60">Bookmark a note and it will appear here.</p>
        )}
      </section>

      <section className={sectionClass}>
        <p className="font-serif text-base text-mercury-ink">Custom lists</p>
        <form onSubmit={submitList} className="mt-3 flex gap-2">
          <input
            value={listName}
            onChange={(event) => setListName(event.target.value)}
            maxLength={60}
            placeholder="Mid-Sem Prep"
            className="min-w-0 flex-1 rounded-md border border-mercury-ink/20 bg-paper px-2 py-1.5 font-hand text-sm outline-none focus:border-mercury-ink/45"
          />
          <button
            disabled={busy || !listName.trim()}
            className="rounded-md bg-mercury-ink px-3 font-hand text-sm text-paper disabled:opacity-45"
          >
            New
          </button>
        </form>
        {studyTools.lists.length > 0 && (
          <div className="mt-2 flex gap-2">
            <select
              value={selectedListId}
              onChange={(event) => setSelectedListId(event.target.value)}
              className="min-w-0 flex-1 rounded-md border border-mercury-ink/20 bg-paper px-2 py-1.5 font-hand text-sm text-ink-soft"
            >
              <option value="">Choose a list</option>
              {studyTools.lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name} ({list.topicIds.length})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addToList}
              disabled={busy || !selectedListId || !activeTopicId}
              className="rounded-md border border-mercury-ink/25 px-2 font-hand text-sm text-mercury-ink disabled:opacity-40"
            >
              Add
            </button>
          </div>
        )}
      </section>

      <section className={sectionClass}>
        <div className="flex items-center justify-between">
          <p className="font-serif text-base text-mercury-ink">Private annotation</p>
          <span className="font-hand text-xs text-ink-soft/55">Only you</span>
        </div>
        <PrivateAnnotationEditor
          key={activeTopicId ?? "empty"}
          topicId={activeTopicId}
          initialContent={activeTopicId ? (studyTools.annotations[activeTopicId] ?? "") : ""}
          progress={activeTopicId ? (studyTools.progress[activeTopicId] ?? 0) : 0}
          onSave={onSaveAnnotation}
        />
      </section>

      {message && (
        <p role="status" className="px-1 font-hand text-sm text-mercury-ink sm:col-span-2 xl:col-span-1">
          {message}
        </p>
      )}
    </aside>
  );
}
