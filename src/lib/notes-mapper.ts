import type { Database } from "@/types/database.generated";
import type { SubjectSummary, TopicSummary } from "./notes-api";

type SubjectRow = Database["public"]["Tables"]["subjects"]["Row"];
type TopicRow = Database["public"]["Tables"]["topics"]["Row"];
type TopicListRow = Pick<
  TopicRow,
  "id" | "subject_id" | "parent_topic_id" | "title" | "sort_order" | "preview_snippet"
>;

export function buildSubjectSummaries(
  subjectRows: SubjectRow[],
  topicRows: TopicListRow[],
): SubjectSummary[] {
  const childrenByParentId = new Map<number, TopicListRow[]>();
  const visitedIds = new Set<number>();
  for (const topic of topicRows) {
    if (topic.parent_topic_id === null) continue;
    const children = childrenByParentId.get(topic.parent_topic_id) ?? [];
    children.push(topic);
    childrenByParentId.set(topic.parent_topic_id, children);
  }

  function toSummary(topic: TopicListRow, ancestors: Set<number>): TopicSummary {
    if (ancestors.has(topic.id)) {
      throw new Error(`Topic hierarchy contains a cycle at topic ${topic.id}`);
    }
    visitedIds.add(topic.id);
    const nextAncestors = new Set(ancestors).add(topic.id);
    const subtopics = [...(childrenByParentId.get(topic.id) ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
      .map((child) => {
        if (child.subject_id !== topic.subject_id) {
          throw new Error(`Topic ${child.id} belongs to a different subject than its parent`);
        }
        return toSummary(child, nextAncestors);
      });

    return {
      id: topic.id,
      title: topic.title,
      previewSnippet: topic.preview_snippet,
      subtopics,
    };
  }

  const summaries = [...subjectRows]
    .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
    .map((subject) => ({
      id: subject.id,
      name: subject.name,
      colorHex: subject.color_hex,
      topics: topicRows
        .filter((topic) => topic.subject_id === subject.id && topic.parent_topic_id === null)
        .sort((a, b) => a.sort_order - b.sort_order || a.id - b.id)
        .map((topic) => toSummary(topic, new Set())),
    }));

  const unvisited = topicRows.filter((topic) => !visitedIds.has(topic.id));
  if (unvisited.length > 0) {
    throw new Error(`Topic hierarchy contains orphaned or cyclic topics: ${unvisited.map((t) => t.id).join(", ")}`);
  }
  return summaries;
}
