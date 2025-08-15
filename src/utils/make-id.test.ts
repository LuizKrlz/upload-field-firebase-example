import { describe, it, expect } from "vitest";
import { makeId } from "./make-id";

describe("makeId", () => {
  it("returns a string of length 8", () => {
    const id = makeId();
    expect(typeof id).toBe("string");
    expect(id).toHaveLength(8);
  });

  it("returns different values on subsequent calls", () => {
    const id1 = makeId();
    const id2 = makeId();
    expect(id1).not.toBe(id2);
  });

  it("returns only alphanumeric characters", () => {
    const id = makeId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });
});
