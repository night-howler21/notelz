"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/action-result";
import { validationFailure } from "@/lib/action-result";
import {
  forgotPasswordSchema,
  loginSchema,
  normalizeUsername,
  resetPasswordSchema,
  signupSchema,
} from "@/lib/validation";

type AuthSuccess = { displayName: string; username: string };

function isRateLimited(error: { status?: number; code?: string } | null) {
  return error?.status === 429 || error?.code === "over_request_rate_limit";
}

export async function signup(input: unknown): Promise<ActionResult<AuthSuccess>> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return validationFailure(parsed.error.flatten().fieldErrors);
  }

  try {
    const admin = createAdminClient();
    const normalizedUsername = normalizeUsername(parsed.data.username);
    const { data: existingUsername, error: usernameLookupError } = await admin
      .from("profiles")
      .select("id")
      .eq("normalized_username", normalizedUsername)
      .maybeSingle();

    if (usernameLookupError) {
      throw usernameLookupError;
    }
    if (existingUsername) {
      return { ok: false, code: "USERNAME_TAKEN", message: "That username is already taken" };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: {
          username: parsed.data.username,
          display_name: parsed.data.displayName,
        },
      },
    });

    if (error) {
      if (isRateLimited(error)) {
        return { ok: false, code: "RATE_LIMITED", message: "Too many attempts. Try again shortly." };
      }
      if (error.code === "user_already_exists" || error.message.toLowerCase().includes("already registered")) {
        return { ok: false, code: "EMAIL_TAKEN", message: "An account with this email already exists" };
      }
      if (error.message.toLowerCase().includes("duplicate") || error.message.toLowerCase().includes("username")) {
        return { ok: false, code: "USERNAME_TAKEN", message: "That username is already taken" };
      }
      return { ok: false, code: "UNKNOWN", message: error.message };
    }

    if (!data.session) {
      return {
        ok: false,
        code: "CONFIGURATION",
        message: "Signup succeeded, but immediate login is disabled in Supabase Auth settings.",
      };
    }

    return {
      ok: true,
      data: { displayName: parsed.data.displayName, username: parsed.data.username },
    };
  } catch {
    return { ok: false, code: "UNKNOWN", message: "Something went wrong. Please try again." };
  }
}

export async function login(input: unknown): Promise<ActionResult<AuthSuccess>> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return validationFailure(parsed.error.flatten().fieldErrors);
  }

  try {
    let email = parsed.data.identifier.trim().toLowerCase();
    const admin = createAdminClient();

    if (!email.includes("@")) {
      const { data: profile, error: profileError } = await admin
        .from("profiles")
        .select("id")
        .eq("normalized_username", normalizeUsername(email))
        .maybeSingle();

      if (profileError || !profile) {
        return { ok: false, code: "INVALID_CREDENTIALS", message: "Invalid credentials" };
      }

      const { data: userData, error: userError } = await admin.auth.admin.getUserById(profile.id);
      if (userError || !userData.user.email) {
        return { ok: false, code: "INVALID_CREDENTIALS", message: "Invalid credentials" };
      }
      email = userData.user.email;
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: parsed.data.password,
    });

    if (error || !data.user) {
      if (isRateLimited(error)) {
        return { ok: false, code: "RATE_LIMITED", message: "Too many attempts. Try again shortly." };
      }
      return { ok: false, code: "INVALID_CREDENTIALS", message: "Invalid credentials" };
    }

    const { data: profile } = await admin
      .from("profiles")
      .select("display_name, username")
      .eq("id", data.user.id)
      .single();

    return {
      ok: true,
      data: {
        displayName: profile?.display_name ?? data.user.user_metadata.display_name ?? "Student",
        username: profile?.username ?? data.user.user_metadata.username ?? "student",
      },
    };
  } catch {
    return { ok: false, code: "INVALID_CREDENTIALS", message: "Invalid credentials" };
  }
}

export async function forgotPassword(
  input: unknown,
): Promise<ActionResult<{ resetPath: string }>> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return validationFailure(parsed.error.flatten().fieldErrors);
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.generateLink({
      type: "recovery",
      email: parsed.data.email,
    });

    if (error) {
      if (isRateLimited(error)) {
        return { ok: false, code: "RATE_LIMITED", message: "Too many attempts. Try again shortly." };
      }
      return { ok: false, code: "NOT_FOUND", message: "No account with that email" };
    }

    const params = new URLSearchParams({
      token_hash: data.properties.hashed_token,
      type: "recovery",
    });
    return { ok: true, data: { resetPath: `/auth/confirm?${params.toString()}` } };
  } catch {
    return { ok: false, code: "NOT_FOUND", message: "No account with that email" };
  }
}

export async function resetPassword(input: unknown): Promise<ActionResult> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return validationFailure(parsed.error.flatten().fieldErrors);
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) {
    return { ok: false, code: "INVALID_RECOVERY", message: "That reset link is invalid or has expired." };
  }

  const { error } = await supabase.auth.updateUser({ password: parsed.data.newPassword });
  if (error) {
    return { ok: false, code: "INVALID_RECOVERY", message: "That reset link is invalid or has expired." };
  }

  await supabase.auth.signOut();
  return { ok: true, data: undefined };
}

export async function logout(): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  return error
    ? { ok: false, code: "UNKNOWN", message: "Couldn't log out. Please try again." }
    : { ok: true, data: undefined };
}
