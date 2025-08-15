import { describe, it, expect, vi } from "vitest";

import { useUploadList } from "./use-upload-list";
import type { TFileItem } from "../upload-input.types";

describe("useUploadList", () => {
  // Helper to create TFileItem
  const makeItem = (id: string): TFileItem => ({
    id,
    file: new File([id], `${id}.txt`),
    previewURL: `url/${id}`,
  });

  it("should move an item from one index to another", () => {
    const value = [makeItem("a"), makeItem("b"), makeItem("c")];
    const onChange = vi.fn();
    const { onMove } = useUploadList({ value, onChange });

    // Move 'b' (index 1) to index 0
    onMove(1, 0);
    expect(onChange).toHaveBeenCalledWith([
      makeItem("b"),
      makeItem("a"),
      makeItem("c"),
    ]);
  });

  it("should move an item from one index to another (down)", () => {
    const value = [makeItem("a"), makeItem("b"), makeItem("c")];
    const onChange = vi.fn();
    const { onMove } = useUploadList({ value, onChange });

    // Move 'b' (index 1) to index 2
    onMove(1, 2);
    expect(onChange).toHaveBeenCalledWith([
      makeItem("a"),
      makeItem("c"),
      makeItem("b"),
    ]);
  });

  it("should delete an item by id", () => {
    const value = [makeItem("a"), makeItem("b"), makeItem("c")];
    const onChange = vi.fn();
    const { onDelete } = useUploadList({ value, onChange });

    onDelete("b");
    expect(onChange).toHaveBeenCalledWith([makeItem("a"), makeItem("c")]);
  });
});
