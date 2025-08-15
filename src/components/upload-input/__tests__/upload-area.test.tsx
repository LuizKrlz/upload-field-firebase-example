// Mock URL.createObjectURL for the test environment
global.URL.createObjectURL = vi.fn(() => "mock-url");

import { render } from "@testing-library/react";
import UploadArea from "../upload-area";
import type { TFileItem } from "../upload-input.types";
import { vi } from "vitest";

// Variable to capture the onDrop callback
let capturedOnDrop:
  | ((files: File[], rejected: unknown[], event: unknown) => void)
  | undefined;
vi.mock("react-dropzone", () => ({
  useDropzone: vi.fn((opts?: { onDrop?: typeof capturedOnDrop }) => {
    capturedOnDrop = opts?.onDrop;
    return {
      getRootProps: () => ({ onClick: vi.fn(), tabIndex: 0 }),
      getInputProps: () => ({}),
      isDragActive: false,
    };
  }),
}));

vi.mock("@/utils/make-id", () => ({
  makeId: () => "mock-id",
}));

describe("UploadArea", () => {
  const mockOnChange = vi.fn();
  const userId = "user-123";
  const file: File = new File(["file content"], "test.png", {
    type: "image/png",
  });
  const value: TFileItem[] = [
    {
      id: "mock-id",
      file,
      isCover: false,
      previewURL: "blob:http://localhost/mock-url",
      storagePath: `UserFolder/${userId}/test.png`,
      metadata: { contentType: "image/png" },
    },
  ];

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with no files", () => {
    const { getByText } = render(
      <UploadArea value={[]} onChange={mockOnChange} userId={userId} />
    );
    expect(getByText(/drag and drop files here/i)).toBeInTheDocument();
    expect(getByText(/click to select/i)).toBeInTheDocument();
  });

  it("renders with a cover image", () => {
    const { getByText } = render(
      <UploadArea value={value} onChange={mockOnChange} userId={userId} />
    );
    expect(getByText(/drag and drop files here/i)).toBeInTheDocument();
  });

  it("calls onChange when files are dropped", () => {
    // Render to trigger useDropzone and capture onDrop
    render(<UploadArea value={[]} onChange={mockOnChange} userId={userId} />);
    // Simulate drop by calling the captured onDrop directly
    capturedOnDrop?.([file], [], {});
    expect(mockOnChange).toHaveBeenCalledWith([
      expect.objectContaining({
        id: "mock-id",
        file,
        previewURL: expect.any(String),
        storagePath: expect.stringContaining(userId),
      }),
    ]);
  });
});
