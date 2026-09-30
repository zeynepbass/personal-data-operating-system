import { z } from "zod";

export const NOTE_SECTION_TYPES = ["text", "code", "list", "quote"];

const requiredText = (label, max) =>
  z
    .string({ error: `${label} gereklidir.` })
    .trim()
    .min(1, `${label} gereklidir.`)
    .max(max, `${label} en fazla ${max} karakter olabilir.`);

export const noteSectionSchema = z.object({
  id: z.string().trim().min(1).max(64),
  title: requiredText("Bölüm başlığı", 200),
  type: z.enum(NOTE_SECTION_TYPES, { error: "Geçersiz bölüm türü." }).default("text"),
  content: z.string().max(20_000, "Bölüm içeriği çok uzun.").default(""),
  language: z.string().trim().max(40).nullable().default(null),
  items: z.array(z.string().trim().min(1).max(500)).max(200).default([]),
});

export const noteSchema = z.object({
  title: requiredText("Başlık", 200),
  description: requiredText("Açıklama", 2_000),
  category: requiredText("Kategori", 80),
  subCategory: requiredText("Alt kategori", 80),
  sections: z.array(noteSectionSchema).max(50, "En fazla 50 bölüm eklenebilir.").default([]),
});

export const noteFormSchema = noteSchema.extend({
  sections: z
    .array(
      noteSectionSchema.extend({
        language: z.string().trim().max(40).nullable().optional(),
        items: z
          .array(z.object({ value: z.string().trim().max(500) }))
          .max(200)
          .default([]),
      }),
    )
    .max(50, "En fazla 50 bölüm eklenebilir.")
    .default([]),
});

/**
 * @param {{ id?: string, title?: string, type?: string } | undefined} [section]
 */
export function emptyNoteSection(section = {}) {
  return {
    id: section.id ?? `section-${Math.random().toString(36).slice(2, 10)}`,
    title: section.title ?? "",
    type: section.type ?? "text",
    content: "",
    language: "",
    items: [],
  };
}

/**
 * @param {any} note
 */
export function toNoteFormValues(note) {
  return {
    title: note?.title ?? "",
    description: note?.description ?? "",
    category: note?.category ?? "",
    subCategory: note?.subCategory ?? "",
    sections: (note?.sections ?? []).map((section) => ({
      ...emptyNoteSection(section),
      content: section.content ?? "",
      language: section.language ?? "",
      items: (section.items ?? []).map((value) => ({ value })),
    })),
  };
}

/**
 * @param {z.output<typeof noteFormSchema>} values
 */
export function toNotePayload(values) {
  return {
    ...values,
    sections: values.sections.map((section) => ({
      id: section.id,
      title: section.title,
      type: section.type,
      content: section.type === "list" ? "" : section.content,
      language: section.type === "code" ? section.language || null : null,
      items:
        section.type === "list"
          ? section.items.map((item) => item.value).filter((value) => value.length > 0)
          : [],
    })),
  };
}

export const noteFilterSchema = z.object({
  category: z.string().trim().max(80).optional(),
  q: z.string().trim().max(100).optional(),
});
