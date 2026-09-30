import { z } from "zod";

export const GOAL_STATUSES = ["active", "completed"];

export const goalItemSchema = z.object({
  title: z
    .string({ error: "Adım başlığı gereklidir." })
    .trim()
    .min(1, "Adım başlığı gereklidir.")
    .max(200, "Adım başlığı en fazla 200 karakter olabilir."),
  value: z.coerce
    .number({ error: "Değer sayı olmalıdır." })
    .min(0, "Değer 0'dan küçük olamaz.")
    .max(100, "Değer 100'den büyük olamaz.")
    .default(0),
});

const goalItemsSchema = z
  .array(goalItemSchema)
  .max(50, "En fazla 50 adım eklenebilir.")
  .refine(
    (items) =>
      new Set(items.map((item) => item.title.toLocaleLowerCase("tr-TR"))).size === items.length,
    "Adım başlıkları benzersiz olmalıdır.",
  )
  .refine(
    (items) => items.reduce((total, item) => total + item.value, 0) <= 100,
    "Adımların toplamı 100'ü geçemez.",
  );

export const goalSchema = z.object({
  title: z
    .string({ error: "Başlık gereklidir." })
    .trim()
    .min(1, "Başlık gereklidir.")
    .max(200, "Başlık en fazla 200 karakter olabilir."),
  category: z
    .string({ error: "Kategori gereklidir." })
    .trim()
    .min(1, "Kategori gereklidir.")
    .max(80, "Kategori en fazla 80 karakter olabilir."),
  items: goalItemsSchema.default([]),
});

export const goalProgressSchema = goalItemsSchema;

export const goalFilterSchema = z.object({
  status: z.enum(GOAL_STATUSES).optional(),
});

/**
 * @param {Array<{ value: number }>} items
 * @returns {"active" | "completed"}
 */
export function deriveGoalStatus(items) {
  const total = items.reduce((sum, item) => sum + Number(item.value || 0), 0);
  return total >= 100 ? "completed" : "active";
}
