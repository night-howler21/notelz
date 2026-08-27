export type ActionErrorCode =
  | "VALIDATION"
  | "INVALID_CREDENTIALS"
  | "USERNAME_TAKEN"
  | "EMAIL_TAKEN"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "INVALID_RECOVERY"
  | "CONFIGURATION"
  | "UNKNOWN";

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; code: ActionErrorCode; message: string; fieldErrors?: Record<string, string[]> };

export function validationFailure(
  fieldErrors: Record<string, string[] | undefined>,
): ActionResult<never> {
  return {
    ok: false,
    code: "VALIDATION",
    message: "Please check the highlighted fields and try again.",
    fieldErrors: Object.fromEntries(
      Object.entries(fieldErrors).filter((entry): entry is [string, string[]] => Boolean(entry[1])),
    ),
  };
}
