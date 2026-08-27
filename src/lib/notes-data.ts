import "server-only";

import type { SubjectSummary, TopicDetail, TopicSummary } from "./notes-api";
import { buildSubjectSummaries } from "./notes-mapper";
import { createClient } from "./supabase/server";

export async function listSubjects(): Promise<SubjectSummary[]> {
  const supabase = await createClient();
  const [subjectsResult, topicsResult] = await Promise.all([
    supabase.from("subjects").select("id, name, color_hex, sort_order").order("sort_order"),
    supabase
      .from("topics")
      .select("id, subject_id, parent_topic_id, title, sort_order, preview_snippet")
      .order("sort_order"),
  ]);

  if (subjectsResult.error) throw subjectsResult.error;
  if (topicsResult.error) throw topicsResult.error;
  return buildSubjectSummaries(subjectsResult.data, topicsResult.data);
}

export async function getTopicDetail(id: number): Promise<TopicDetail | null> {
  const supabase = await createClient();
  const { data: topic, error: topicError } = await supabase
    .from("topics")
    .select("id, title, content, subject_id")
    .eq("id", id)
    .maybeSingle();

  if (topicError) throw topicError;
  if (!topic) return null;

  const [subjectResult, relationResult] = await Promise.all([
    supabase.from("subjects").select("name").eq("id", topic.subject_id).single(),
    supabase
      .from("topic_related_topics")
      .select("related_topic_id")
      .eq("topic_id", topic.id)
      .order("related_topic_id"),
  ]);

  if (subjectResult.error) throw subjectResult.error;
  if (relationResult.error) throw relationResult.error;

  const relatedIds = relationResult.data.map((relation) => relation.related_topic_id);
  let relatedTopics: TopicSummary[] = [];

  if (relatedIds.length > 0) {
    const { data, error } = await supabase
      .from("topics")
      .select("id, title, preview_snippet")
      .in("id", relatedIds);
    if (error) throw error;
    const byId = new Map(data.map((related) => [related.id, related]));
    relatedTopics = relatedIds.flatMap((relatedId) => {
      const related = byId.get(relatedId);
      return related
        ? [{ id: related.id, title: related.title, previewSnippet: related.preview_snippet, subtopics: [] }]
        : [];
    });
  }

  return {
    id: topic.id,
    title: topic.title,
    content: topic.content,
    subjectId: topic.subject_id,
    subjectName: subjectResult.data.name,
    relatedTopics,
  };
}
