import { render, screen } from "@testing-library/react";
import { UploadInput } from "../index";
import type { TFileItem } from "../upload-input.types";
import { makeId } from "@/utils/make-id";
import { vi } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe("UploadInput", () => {
  const mockOnChange = vi.fn();
  const mockFile = new File(["dummy content"], "file1.png", {
    type: "image/png",
  });
  const mockValue: TFileItem[] = [
    {
      id: makeId(),
      file: mockFile,
      previewURL: "/preview.png",
      storagePath: "/test",
    },
  ];
  const userId = "user-123";

  it("renders UploadArea and UploadList", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <UploadInput
          value={mockValue}
          onChange={mockOnChange}
          userId={userId}
        />
      </DndProvider>
    );
    // Check for UploadArea and UploadList by their roles or text
    // Since UploadArea and UploadList are custom, check for file name in the list
    expect(screen.getByText("file1.png")).toBeInTheDocument();
  });
});
