import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock URL.revokeObjectURL for jsdom
if (!global.URL.revokeObjectURL) {
  global.URL.revokeObjectURL = vi.fn();
}
