import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders an accessible dialog only while open", () => {
    const { rerender } = render(
      <Modal open={false} onClose={() => {}} title="Başlık">
        İçerik
      </Modal>,
    );
    expect(screen.queryByText("İçerik")).not.toBeInTheDocument();

    rerender(
      <Modal open onClose={() => {}} title="Başlık" description="Açıklama">
        İçerik
      </Modal>,
    );

    const dialog = screen.getByRole("dialog", { name: "Başlık" });
    expect(dialog).toHaveAccessibleDescription("Açıklama");
    expect(screen.getByText("İçerik")).toBeVisible();
  });

  it("closes with the close button and Escape", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <Modal open onClose={onClose} title="Başlık">
        İçerik
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: "Kapat" }));
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));

    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("refuses to close while busy", async () => {
    const onClose = vi.fn();
    render(
      <Modal open busy onClose={onClose} title="Başlık">
        İçerik
      </Modal>,
    );

    expect(screen.getByRole("button", { name: "Kapat" })).toBeDisabled();
    fireEvent(screen.getByRole("dialog"), new Event("cancel", { cancelable: true }));
    expect(onClose).not.toHaveBeenCalled();
  });
});
