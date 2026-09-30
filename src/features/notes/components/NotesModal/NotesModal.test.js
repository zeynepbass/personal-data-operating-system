import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import NotesModal from "./NotesModal";

const existingNote = {
  id: "n1",
  title: "Closures",
  description: "JS closures",
  category: "Frontend",
  subCategory: "JavaScript",
  sections: [
    { id: "s1", title: "Liste", type: "list", content: "", language: null, items: ["a", "b"] },
  ],
};

describe("NotesModal", () => {
  it("builds the note payload from nested sections", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<NotesModal open onClose={vi.fn()} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/^Başlık/), "Hooks");
    await user.type(screen.getByLabelText(/^Açıklama/), "React hooks");
    await user.type(screen.getByLabelText(/^Kategori/), "Frontend");
    await user.type(screen.getByLabelText(/^Alt kategori/), "React");

    await user.click(screen.getByRole("button", { name: "+ Bölüm ekle" }));
    const section = screen.getByRole("group", { name: "Bölüm 1" });
    await user.type(within(section).getByLabelText("Bölüm başlığı"), "Örnek");
    await user.selectOptions(within(section).getByLabelText("Bölüm tipi"), "code");
    await user.type(within(section).getByLabelText("Programlama dili"), "js");
    await user.type(within(section).getByLabelText("Kod"), "const a = 1;");

    await user.click(screen.getByRole("button", { name: "Notu oluştur" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    const [payload] = onSubmit.mock.calls[0];
    expect(payload).toMatchObject({
      title: "Hooks",
      category: "Frontend",
      sections: [
        { title: "Örnek", type: "code", language: "js", content: "const a = 1;", items: [] },
      ],
    });
  });

  it("prefills an existing note and drops empty list items", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<NotesModal open note={existingNote} onClose={vi.fn()} onSubmit={onSubmit} />);

    expect(screen.getByRole("dialog", { name: "Notu düzenle" })).toBeInTheDocument();
    expect(screen.getByLabelText(/^Başlık/)).toHaveValue("Closures");

    await user.click(screen.getByRole("button", { name: "+ Madde ekle" }));
    await user.click(screen.getByRole("button", { name: "Değişiklikleri kaydet" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalled());
    expect(onSubmit.mock.calls[0][0].sections[0].items).toEqual(["a", "b"]);
  });

  it("shows validation errors for required fields", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<NotesModal open onClose={vi.fn()} onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: "Notu oluştur" }));

    expect(await screen.findByText("Başlık gereklidir.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
