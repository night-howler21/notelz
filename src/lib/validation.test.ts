import { describe, expect, it } from "vitest";
import { contactSchema, normalizeUsername, signupSchema } from "./validation";

describe("signup validation", () => {
  it("normalizes email while preserving the chosen username", () => {
    const result = signupSchema.parse({
      email: "  ADA@Example.com ",
      username: "Ada_Lovelace",
      password: "analytical-engine",
      displayName: " Ada Lovelace ",
    });
    expect(result.email).toBe("ada@example.com");
    expect(result.username).toBe("Ada_Lovelace");
    expect(result.displayName).toBe("Ada Lovelace");
    expect(normalizeUsername(result.username)).toBe("ada_lovelace");
  });

  it("rejects short passwords and invalid usernames", () => {
    const result = signupSchema.safeParse({
      email: "student@example.com",
      username: "no spaces",
      password: "short",
      displayName: "Student",
    });
    expect(result.success).toBe(false);
  });
});

describe("contact validation", () => {
  it("enforces the 4000 character message limit", () => {
    expect(
      contactSchema.safeParse({ name: "Ada", email: "ada@example.com", message: "x".repeat(4001) }).success,
    ).toBe(false);
  });
});
