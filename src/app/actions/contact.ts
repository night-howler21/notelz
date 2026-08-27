"use server";

import type { ActionResult } from "@/lib/action-result";
import { validationFailure } from "@/lib/action-result";
import { contactSchema } from "@/lib/validation";
import { createClient } from "@/lib/supabase/server";

export async function sendContactMessage(input: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return validationFailure(parsed.error.flatten().fieldErrors);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").insert(parsed.data);

  return error
    ? { ok: false, code: "UNKNOWN", message: "Failed to send message" }
    : { ok: true, data: undefined };
}
