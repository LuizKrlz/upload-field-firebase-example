import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConnectedEmulatorIndicator } from "../";

describe("ConnectedEmulatorIndicator", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("does not render if not connected to emulator", () => {
    render(<ConnectedEmulatorIndicator />);
    expect(screen.queryByText(/Connected to Emulator/i)).toBeNull();
  });

  it("renders indicator if connected to emulator", () => {
    localStorage.setItem("connectedEmulator", "1");
    render(<ConnectedEmulatorIndicator />);
    expect(screen.getByText(/Connected to Emulator/i)).toBeTruthy();
  });

  it("removes localStorage item on unmount", () => {
    localStorage.setItem("connectedEmulator", "1");
    const { unmount } = render(<ConnectedEmulatorIndicator />);
    unmount();
    expect(localStorage.getItem("connectedEmulator")).toBeNull();
  });
});
