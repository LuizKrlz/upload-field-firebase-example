import { describe, it, expect } from "vitest";
import { calculateFileSize } from "./image";

describe("calculateFileSize", () => {
  it("returns bytes for sizes less than 1 KB", () => {
    expect(calculateFileSize(500)).toBe("500 B");
    expect(calculateFileSize(0)).toBe("0 B");
  });

  it("returns KB for sizes between 1 KB and 1 MB", () => {
    expect(calculateFileSize(1024)).toBe("1.00 KB");
    expect(calculateFileSize(2048)).toBe("2.00 KB");
    expect(calculateFileSize(1536)).toBe("1.50 KB");
  });

  it("returns MB for sizes between 1 MB and 1 GB", () => {
    expect(calculateFileSize(1024 * 1024)).toBe("1.00 MB");
    expect(calculateFileSize(2 * 1024 * 1024)).toBe("2.00 MB");
    expect(calculateFileSize(1.5 * 1024 * 1024)).toBe("1.50 MB");
  });

  it("returns GB for sizes 1 GB and above", () => {
    expect(calculateFileSize(1024 * 1024 * 1024)).toBe("1.00 GB");
    expect(calculateFileSize(2 * 1024 * 1024 * 1024)).toBe("2.00 GB");
    expect(calculateFileSize(1.5 * 1024 * 1024 * 1024)).toBe("1.50 GB");
  });
});
