import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { GoalForm } from "./GoalForm";

async function fillBasics(user) {
  await user.type(screen.getByLabelText(/Başlık/), "Ship v2");
  await user.selectOptions(screen.getByLabelText(/Kategori/), "work-goals");
}

async function addStep(user, title, value) {
  await user.click(screen.getByRole("button", { name: "+ Ekle" }));
  const titles = screen.getAllByPlaceholderText("Hedef adımı");
  const values = screen.getAllByPlaceholderText("Değer");
  await user.type(titles.at(-1), title);
  await user.clear(values.at(-1));
  await user.type(values.at(-1), String(value));
}

describe("GoalForm", () => {
  it("submits parsed values", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<GoalForm onSubmit={onSubmit} />);

    await fillBasics(user);
    await addStep(user, "Design", 40);
    await user.click(screen.getByRole("button", { name: "Hedef Oluştur" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0]).toEqual({
      title: "Ship v2",
      category: "work-goals",
      items: [{ title: "Design", value: 40 }],
    });
  });

  it("blocks steps whose total exceeds 100", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<GoalForm onSubmit={onSubmit} />);

    await fillBasics(user);
    await addStep(user, "A", 70);
    await addStep(user, "B", 40);
    await user.click(screen.getByRole("button", { name: "Hedef Oluştur" }));

    expect(await screen.findByText("Adımların toplamı 100'ü geçemez.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("removes a step", async () => {
    const user = userEvent.setup();
    render(<GoalForm onSubmit={vi.fn()} />);

    await addStep(user, "Temporary", 10);
    await user.click(screen.getByRole("button", { name: "Adım 1 sil" }));

    expect(screen.queryByPlaceholderText("Hedef adımı")).not.toBeInTheDocument();
  });
});
