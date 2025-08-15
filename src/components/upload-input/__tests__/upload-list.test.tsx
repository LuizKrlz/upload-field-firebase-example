import { render, screen, fireEvent } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { vi } from "vitest";
import { UploadList } from "../upload-list";
import type { TFileItem } from "../upload-input.types";

describe("UploadList", () => {
  const mockFiles: TFileItem[] = [
    {
      id: "1",
      file: new File(["dummy content"], "file1.png", { type: "image/png" }),
      previewURL: "blob:http://localhost/file1",
      storagePath: "uploads/file1.png",
    },
    {
      id: "2",
      file: new File(["dummy content"], "file2.jpg", { type: "image/jpeg" }),
      previewURL: "blob:http://localhost/file2",
      storagePath: "uploads/file2.jpg",
    },
  ];

  it("renders nothing when value is empty", () => {
    const { container } = render(
      <DndProvider backend={HTML5Backend}>
        <UploadList value={[]} onChange={vi.fn()} />
      </DndProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders a list of files", () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <UploadList value={mockFiles} onChange={vi.fn()} />
      </DndProvider>
    );
    expect(screen.getByText("file1.png")).toBeInTheDocument();
    expect(screen.getByText("file2.jpg")).toBeInTheDocument();
  });

  it("calls onChange when onDelete is triggered", () => {
    const onChange = vi.fn();
    render(
      <DndProvider backend={HTML5Backend}>
        <UploadList value={mockFiles} onChange={onChange} />
      </DndProvider>
    );
    // Find the delete button for the first item (assuming a button is present)
    const deleteButtons = screen.getAllByRole("button");
    fireEvent.click(deleteButtons[0]);
    expect(onChange).toHaveBeenCalled();
  });
});
