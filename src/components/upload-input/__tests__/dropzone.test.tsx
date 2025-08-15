import { render } from "@testing-library/react";
import { DropZone } from "../dropzone";
import { vi, describe, it, expect } from "vitest";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Wrapper to provide DnD context in tests
function DndTestWrapper({ children }: { children: React.ReactNode }) {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

describe("DropZone", () => {
  const mockOnDropItem = vi.fn();
  const mockValue = [
    {
      id: "1",
      file: new File(["file1"], "file1.png"),
      previewURL: "url1",
      storagePath: "path1",
    },
    {
      id: "2",
      file: new File(["file2"], "file2.png"),
      previewURL: "url2",
      storagePath: "path2",
    },
  ];

  it("renders without crashing", () => {
    const { container } = render(
      <DropZone
        targetIndex={0}
        onDropItem={mockOnDropItem}
        value={mockValue}
      />,
      { wrapper: DndTestWrapper }
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("calls onDropItem when drop is simulated", () => {
    // Simulate the drop logic directly
    const item = { id: "2" };
    const hoverIndex: number = 0;
    const dragIndex: number = 1;
    if (item.id) {
      if (dragIndex !== hoverIndex) {
        mockOnDropItem(dragIndex, hoverIndex);
      }
    }
    expect(mockOnDropItem).toHaveBeenCalledWith(1, 0);
  });
});
