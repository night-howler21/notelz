const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

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

async function authedGet<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}

export function fetchSubjects(token: string) {
  return authedGet<SubjectSummary[]>("/api/notes/subjects", token);
}

export function fetchTopic(id: number, token: string) {
  return authedGet<TopicDetail>(`/api/notes/topics/${id}`, token);
}
