import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TestBackend } from "react-dnd-test-backend";
import { vi } from "vitest";
import { UploadListItem } from "../upload-list-item";
import type { TUploadListItemProps } from "../upload-input.types";

vi.mock("firebase/storage", () => {
  const onMock = vi.fn();
  const uploadBytesResumableMock = vi.fn(() => ({ on: onMock }));
  const refStorageMock = vi.fn();
  // Expose mocks for test access
  (globalThis as any).__mocks__ = {
    onMock,
    uploadBytesResumableMock,
    refStorageMock,
  };
  return {
    uploadBytesResumable: uploadBytesResumableMock,
    ref: refStorageMock,
  };
});

vi.mock("@/lib/firebase", () => ({
  storage: {},
}));

vi.mock("@/components/ui/progress", () => ({
  Progress: ({ value }: { value: number }) => (
    <div data-testid="progress">Progress: {value}</div>
  ),
}));

vi.mock("@/utils/image", () => ({
  calculateFileSize: (size: number) => `${size} bytes`,
}));

global.URL.revokeObjectURL = vi.fn();

describe("UploadListItem", () => {
  const file = new File(["file content"], "test.png", { type: "image/png" });
  const item = {
    id: "1",
    file,
    isCover: false,
    previewURL: "mock-url",
    storagePath: "UserFolder/user-123/test.png",
    metadata: { contentType: "image/png" },
  };
  const defaultProps: TUploadListItemProps = {
    id: "1",
    index: 0,
    item,
    moveItem: vi.fn(),
    onDelete: vi.fn(),
    value: [item],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders file info and image", () => {
    render(
      <DndProvider backend={TestBackend}>
        <UploadListItem {...defaultProps} />
      </DndProvider>
    );
    expect(screen.getByText("test.png")).toBeInTheDocument();
    expect(screen.getByAltText("test.png")).toBeInTheDocument();
    expect(screen.getByText("12 bytes")).toBeInTheDocument();
  });

  it("calls onDelete and revokes object URL when delete button is clicked", () => {
    render(
      <DndProvider backend={TestBackend}>
        <UploadListItem {...defaultProps} />
      </DndProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /remove file/i }));
    expect(defaultProps.onDelete).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith("mock-url");
  });

  it("starts upload on mount and updates progress", async () => {
    // Simulate upload progress
    render(
      <DndProvider backend={TestBackend}>
        <UploadListItem {...defaultProps} />
      </DndProvider>
    );
    // Get the callback for state_changed
    const { onMock } = (globalThis as any).__mocks__;
    const stateChangedCb = onMock.mock.calls[0][1];
    // Simulate progress
    stateChangedCb({ bytesTransferred: 5, totalBytes: 10 });
    expect(await screen.findByTestId("progress")).toHaveTextContent(
      "Progress: 50"
    );
  });
});
