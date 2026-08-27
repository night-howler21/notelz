import { redirect } from "next/navigation";
import NotesNotebook from "@/components/notes/NotesNotebook";
import { listSubjects } from "@/lib/notes-data";
import { loadStudyTools } from "@/lib/study-tools-data";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function NotesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }

  const [subjectResult, studyTools] = await Promise.all([
    listSubjects().catch(() => null),
    loadStudyTools(),
  ]);
  let subjects = subjectResult;
  const initialError = subjects ? null : "Couldn't load your notes right now.";
  subjects ??= [];
  return <NotesNotebook subjects={subjects} initialError={initialError} initialStudyTools={studyTools} />;
}
