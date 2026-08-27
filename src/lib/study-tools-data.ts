import "server-only";

import { createClient } from "@/lib/supabase/server";
import { emptyStudyTools, type StudyToolsData } from "@/lib/study-tools-types";

export async function loadStudyTools(): Promise<StudyToolsData> {
  const supabase = await createClient();
  const [saved, lists, listTopics, annotations, progress] = await Promise.all([
    supabase.from("saved_topics").select("topic_id").order("saved_at", { ascending: false }),
    supabase.from("study_lists").select("id, name").order("updated_at", { ascending: false }),
    supabase.from("study_list_topics").select("list_id, topic_id").order("added_at"),
    supabase.from("topic_annotations").select("topic_id, content"),
    supabase.from("reading_progress").select("topic_id, progress_percent"),
  ]);

  if (saved.error || lists.error || listTopics.error || annotations.error || progress.error) {
    return emptyStudyTools();
  }

  return {
    savedTopicIds: saved.data.map((row) => row.topic_id),
    lists: lists.data.map((list) => ({
      ...list,
      topicIds: listTopics.data
        .filter((item) => item.list_id === list.id)
        .map((item) => item.topic_id),
    })),
    annotations: Object.fromEntries(annotations.data.map((item) => [item.topic_id, item.content])),
    progress: Object.fromEntries(progress.data.map((item) => [item.topic_id, item.progress_percent])),
  };
}
