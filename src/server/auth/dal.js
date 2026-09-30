import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";

import { AppError } from "../errors";

import { readSessionToken } from "./cookies";
import { validateSessionToken } from "./session";

export const getCurrentSession = cache(async () => {
  const token = await readSessionToken();
  return validateSessionToken(token);
});

export const getCurrentUser = cache(async () => {
  const session = await getCurrentSession();
  return session?.user ?? null;
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user)
    throw new AppError("UNAUTHENTICATED", "Oturumunuz sona erdi. Lütfen tekrar giriş yapın.");
  return user;
}

/** @param {"admin" | "user"} role */
export async function requireRole(role) {
  const user = await requireUser();
  if (user.role !== role) throw new AppError("FORBIDDEN", "Bu işlem için yetkiniz yok.");
  return user;
}

export async function requirePageUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
