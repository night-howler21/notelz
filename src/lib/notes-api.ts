export type TopicSummary = {
  id: number;
  title: string;
  previewSnippet: string;
  subtopics: TopicSummary[];
};

export type SubjectSummary = {
  id: number;
  name: string;
  colorHex: string;
  topics: TopicSummary[];
};

export type TopicDetail = {
  id: number;
  title: string;
  content: string;
  subjectId: number;
  subjectName: string;
  relatedTopics: TopicSummary[];
};

export class NotesApiError extends Error {
  constructor(public readonly status: number) {
    super(`Request failed with status ${status}`);
  }
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(path);

  if (!res.ok) {
    throw new NotesApiError(res.status);
  }

  return res.json();
}

export function fetchTopic(id: number) {
  return get<TopicDetail>(`/api/notes/topics/${id}`);
}
