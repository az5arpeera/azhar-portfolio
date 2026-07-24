import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ControlWidget } from "./ControlWidget";
import { usePrefsStore } from "@/lib/store/usePrefsStore";
import { DEFAULT_PREFS } from "@/lib/prefs";

describe("ControlWidget", () => {
  beforeEach(() => {
    usePrefsStore.setState(DEFAULT_PREFS);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("toggles theme between dark and light", async () => {
    render(<ControlWidget />);
    expect(usePrefsStore.getState().theme).toBe("dark");

    await userEvent.click(screen.getByTestId("theme-toggle"));
    expect(usePrefsStore.getState().theme).toBe("light");

    await userEvent.click(screen.getByTestId("theme-toggle"));
    expect(usePrefsStore.getState().theme).toBe("dark");
  });

  it("toggles motion and reflects it in the label", async () => {
    render(<ControlWidget />);
    const button = screen.getByTestId("motion-toggle");
    expect(button).toHaveTextContent("Motion on");

    await userEvent.click(button);
    expect(usePrefsStore.getState().animOn).toBe(false);
    expect(button).toHaveTextContent("Motion off");
  });

  it("toggles audio", async () => {
    render(<ControlWidget />);
    await userEvent.click(screen.getByTestId("audio-toggle"));
    expect(usePrefsStore.getState().audioOn).toBe(true);
  });

  it("persists each change to /api/prefs", async () => {
    render(<ControlWidget />);
    await userEvent.click(screen.getByTestId("theme-toggle"));
    expect(fetch).toHaveBeenCalledWith("/api/prefs", expect.anything());
  });

  it("opens the admin modal and closes it on Escape", async () => {
    render(<ControlWidget />);
    expect(screen.queryByTestId("admin-modal")).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId("admin-button"));
    expect(screen.getByTestId("admin-modal")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByTestId("admin-modal")).not.toBeInTheDocument();
  });
});
