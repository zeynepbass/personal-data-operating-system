import { z } from "zod";

export const DOCUMENT_TYPES = ["pdf", "doc", "report", "other"];
export const DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;

export const documentMetaSchema = z.object({
  name: z
    .string({ error: "Belge adı gereklidir." })
    .trim()
    .min(1, "Belge adı gereklidir.")
    .max(200, "Belge adı en fazla 200 karakter olabilir."),
  type: z.preprocess(
    (value) => (value === "" || value == null ? "pdf" : value),
    z.enum(DOCUMENT_TYPES, { error: "Geçersiz belge türü." }),
  ),
  color: z.string().trim().max(30).optional().default(""),
  shared: z.preprocess((value) => value === true || value === "true", z.boolean()).default(false),
});

export const documentFilterSchema = z.object({
  q: z.string().trim().max(100).optional(),
});
