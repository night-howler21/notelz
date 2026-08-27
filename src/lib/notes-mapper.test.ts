import { describe, expect, it } from "vitest";
import { buildSubjectSummaries } from "./notes-mapper";

const subjects = [
  { id: 2, name: "Torts", color_hex: "#F0D89A", sort_order: 1 },
  { id: 1, name: "Constitutional Law", color_hex: "#A9CBA0", sort_order: 0 },
];

describe("buildSubjectSummaries", () => {
  it("sorts subjects and recursively nests topics", () => {
    const result = buildSubjectSummaries(subjects, [
      {
        id: 2,
        subject_id: 1,
        parent_topic_id: 1,
        title: "Case note",
        sort_order: 0,
        preview_snippet: "Child",
      },
      {
        id: 1,
        subject_id: 1,
        parent_topic_id: null,
        title: "Doctrine",
        sort_order: 0,
        preview_snippet: "Parent",
      },
    ]);

    expect(result.map((subject) => subject.id)).toEqual([1, 2]);
    expect(result[0].topics[0].subtopics[0].id).toBe(2);
  });

  it("rejects orphaned or cyclic hierarchies", () => {
    expect(() =>
      buildSubjectSummaries(subjects, [
        {
          id: 1,
          subject_id: 1,
          parent_topic_id: 2,
          title: "One",
          sort_order: 0,
          preview_snippet: "One",
        },
        {
          id: 2,
          subject_id: 1,
          parent_topic_id: 1,
          title: "Two",
          sort_order: 0,
          preview_snippet: "Two",
        },
      ]),
    ).toThrow(/orphaned or cyclic/);
  });
});
