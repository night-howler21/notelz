import { getTopicDetail } from "@/lib/notes-data";
import { createClient } from "@/lib/supabase/server";

export async function GET(_request: Request, context: RouteContext<"/api/notes/topics/[id]">) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id <= 0) {
    return Response.json({ message: "Invalid topic id" }, { status: 400 });
  }

  try {
    const topic = await getTopicDetail(id);
    return topic
      ? Response.json(topic)
      : Response.json({ message: "Topic not found" }, { status: 404 });
  } catch {
    return Response.json({ message: "Couldn't load that note right now." }, { status: 500 });
  }
}
