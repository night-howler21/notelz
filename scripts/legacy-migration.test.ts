import { describe, expect, it } from "vitest";
import { lobSelectExpression, migrationMode, parseRole } from "./legacy-migration";

describe("legacy migration helpers", () => {
  it("defaults to dry-run and requires an explicit apply flag", () => {
    expect(migrationMode([])).toBe("dry-run");
    expect(migrationMode(["--apply"])).toBe("apply");
    expect(() => migrationMode(["--force"])).toThrow(/Unknown argument/);
  });

  it("supports text and Hibernate OID large objects", () => {
    expect(lobSelectExpression("content", "text")).toBe("content::text as content");
    expect(lobSelectExpression("content", "oid")).toContain("lo_get(content)");
  });

  it("accepts only known application roles", () => {
    expect(parseRole("ADMIN")).toBe("ADMIN");
    expect(() => parseRole("OWNER")).toThrow(/Unsupported legacy role/);
  });
});
