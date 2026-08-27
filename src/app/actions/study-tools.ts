"use server";

import { z } from "zod";
import type { ActionResult } from "@/lib/action-result";
import { validationFailure } from "@/lib/action-result";
import { createClient } from "@/lib/supabase/server";

const topicIdSchema = z.coerce.number().int().positive();
const listNameSchema = z.string().trim().min(1).max(60);
const listIdSchema = z.string().uuid();
const annotationSchema = z.string().max(10000);
const progressSchema = z.coerce.number().int().min(0).max(100);

async function authenticatedClient() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  return { supabase, user: data.user };
}

export async function setTopicSaved(input: unknown): Promise<ActionResult<{ saved: boolean }>> {
  const parsed = z.object({ topicId: topicIdSchema, saved: z.boolean() }).safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  const { supabase, user } = await authenticatedClient();
  if (!user) return { ok: false, code: "UNAUTHORIZED", message: "Please log in again." };

  const { error } = parsed.data.saved
    ? await supabase.from("saved_topics").upsert({ user_id: user.id, topic_id: parsed.data.topicId })
    : await supabase
        .from("saved_topics")
        .delete()
        .eq("user_id", user.id)
        .eq("topic_id", parsed.data.topicId);

  return error
    ? { ok: false, code: "UNKNOWN", message: "Couldn't update your library." }
    : { ok: true, data: { saved: parsed.data.saved } };
}

export async function createStudyList(input: unknown): Promise<ActionResult<{ id: string; name: string }>> {
  const parsed = z.object({ name: listNameSchema }).safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  const { supabase, user } = await authenticatedClient();
  if (!user) return { ok: false, code: "UNAUTHORIZED", message: "Please log in again." };

  const { data, error } = await supabase
    .from("study_lists")
    .insert({ user_id: user.id, name: parsed.data.name })
    .select("id, name")
    .single();
  return error || !data
    ? { ok: false, code: "UNKNOWN", message: "Couldn't create that list. Its name may already exist." }
    : { ok: true, data };
}

export async function addTopicToStudyList(input: unknown): Promise<ActionResult> {
  const parsed = z.object({ listId: listIdSchema, topicId: topicIdSchema }).safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  const { supabase, user } = await authenticatedClient();
  if (!user) return { ok: false, code: "UNAUTHORIZED", message: "Please log in again." };

  const { error } = await supabase
    .from("study_list_topics")
    .upsert({ list_id: parsed.data.listId, topic_id: parsed.data.topicId });
  return error
    ? { ok: false, code: "UNKNOWN", message: "Couldn't add this note to the list." }
    : { ok: true, data: undefined };
}

export async function saveTopicAnnotation(input: unknown): Promise<ActionResult> {
  const parsed = z.object({ topicId: topicIdSchema, content: annotationSchema }).safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  const { supabase, user } = await authenticatedClient();
  if (!user) return { ok: false, code: "UNAUTHORIZED", message: "Please log in again." };

  const { error } = await supabase.from("topic_annotations").upsert({
    user_id: user.id,
    topic_id: parsed.data.topicId,
    content: parsed.data.content,
    updated_at: new Date().toISOString(),
  });
  return error
    ? { ok: false, code: "UNKNOWN", message: "Couldn't save your annotation." }
    : { ok: true, data: undefined };
}

export async function updateReadingProgress(input: unknown): Promise<ActionResult> {
  const parsed = z.object({ topicId: topicIdSchema, progress: progressSchema }).safeParse(input);
  if (!parsed.success) return validationFailure(parsed.error.flatten().fieldErrors);
  const { supabase, user } = await authenticatedClient();
  if (!user) return { ok: false, code: "UNAUTHORIZED", message: "Please log in again." };

  const now = new Date().toISOString();
  const { error } = await supabase.from("reading_progress").upsert({
    user_id: user.id,
    topic_id: parsed.data.topicId,
    progress_percent: parsed.data.progress,
    last_read_at: now,
    completed_at: parsed.data.progress === 100 ? now : null,
  });
  return error
    ? { ok: false, code: "UNKNOWN", message: "Couldn't update reading progress." }
    : { ok: true, data: undefined };
}
