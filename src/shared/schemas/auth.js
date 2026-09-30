import { z } from "zod";

const encoder = new TextEncoder();

export const emailSchema = z
  .string({ error: "E-posta gereklidir." })
  .trim()
  .toLowerCase()
  .pipe(z.email("Geçerli bir e-posta adresi girin."));

export const passwordSchema = z
  .string({ error: "Şifre gereklidir." })
  .min(8, "Şifre en az 8 karakter olmalıdır.")
  .refine((value) => encoder.encode(value).length <= 72, "Şifre en fazla 72 byte olabilir.");

const fullNameSchema = z
  .string({ error: "Ad soyad gereklidir." })
  .trim()
  .min(2, "Ad soyad en az 2 karakter olmalıdır.")
  .max(80, "Ad soyad en fazla 80 karakter olabilir.");

/**
 * @template {z.ZodObject} T
 * @param {T} schema
 */
const withMatchingPasswords = (schema) =>
  schema.refine((data) => data.password === data.passwordAgain, {
    message: "Şifreler eşleşmiyor.",
    path: ["passwordAgain"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string({ error: "Şifre gereklidir." }).min(1, "Şifre gereklidir."),
});

export const registerSchema = withMatchingPasswords(
  z.object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordAgain: z.string({ error: "Şifre tekrarı gereklidir." }),
  }),
);

export const profileSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  about: z.string().trim().max(500, "Hakkımda en fazla 500 karakter olabilir.").default(""),
  currentPassword: z.string().optional(),
});

export const deleteAccountSchema = z.object({
  password: z.string({ error: "Şifre gereklidir." }).min(1, "Şifre gereklidir."),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = withMatchingPasswords(
  z.object({
    token: z.string().min(1, "Geçersiz bağlantı."),
    password: passwordSchema,
    passwordAgain: z.string({ error: "Şifre tekrarı gereklidir." }),
  }),
);
