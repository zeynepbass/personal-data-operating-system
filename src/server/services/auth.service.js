import "server-only";

import {
  deleteAccountSchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "@/shared/schemas/auth";

import { hashPassword, needsRehash, verifyPassword } from "../auth/password";
import { revokeUserSessions } from "../auth/session";
import { AppError } from "../errors";
import {
  createUser,
  deleteUserWithData,
  findUserByEmail,
  findUserById,
  updateUser,
} from "../repositories/user.repository";
import { toPublicUser } from "../serializers/user";
import { parseInput } from "../validation";

import { deleteFile, deleteFilesOwnedBy, fileIdFromUrl, storeFile } from "./file.service";

const INVALID_CREDENTIALS = "E-posta veya şifre hatalı.";

/**
 * @param {unknown} input
 * @returns {Promise<import("../serializers/user").PublicUser>}
 */
export async function register(input) {
  const { fullName, email, password } = parseInput(registerSchema, input);

  if (await findUserByEmail(email)) {
    throw new AppError("CONFLICT", "Bu e-posta adresi zaten kayıtlı.", {
      fieldErrors: { email: ["Bu e-posta adresi zaten kayıtlı."] },
    });
  }

  try {
    const user = await createUser({ fullName, email, password: await hashPassword(password) });
    return toPublicUser(user);
  } catch (error) {
    if (error?.code === 11000) {
      throw new AppError("CONFLICT", "Bu e-posta adresi zaten kayıtlı.", {
        fieldErrors: { email: ["Bu e-posta adresi zaten kayıtlı."] },
      });
    }
    throw error;
  }
}

/**
 * @param {unknown} input
 * @returns {Promise<import("../serializers/user").PublicUser>}
 */
export async function authenticate(input) {
  const { email, password } = parseInput(loginSchema, input);
  const user = await findUserByEmail(email, { withPassword: true });

  const valid = await verifyPassword(password, user?.password);
  if (!user || !valid) throw new AppError("UNAUTHENTICATED", INVALID_CREDENTIALS);

  if (needsRehash(user.password)) {
    await updateUser(String(user._id), { password: await hashPassword(password) });
  }

  return toPublicUser(user);
}

/**
 * @param {{ _id: any, role: string }} actor
 * @param {unknown} input
 * @param {{ avatar?: { data: Uint8Array, name?: string } | null }} [files]
 */
export async function updateProfile(actor, input, { avatar } = {}) {
  const data = parseInput(profileSchema, input);
  const user = await findUserById(String(actor._id), { withPassword: true });
  if (!user) throw new AppError("NOT_FOUND", "Kullanıcı bulunamadı.");

  const changes = { fullName: data.fullName, about: data.about };

  if (data.email !== user.email) {
    const confirmed = await verifyPassword(data.currentPassword ?? "", user.password);
    if (!confirmed) {
      throw new AppError("VALIDATION", "E-posta değiştirmek için mevcut şifrenizi girin.", {
        fieldErrors: { currentPassword: ["Mevcut şifre hatalı."] },
      });
    }

    const taken = await findUserByEmail(data.email);
    if (taken) {
      throw new AppError("CONFLICT", "Bu e-posta adresi zaten kullanılıyor.", {
        fieldErrors: { email: ["Bu e-posta adresi zaten kullanılıyor."] },
      });
    }
    changes.email = data.email;
  }

  if (avatar?.data?.byteLength) {
    const stored = await storeFile({
      data: avatar.data,
      kind: "avatar",
      ownerId: user._id,
      originalName: avatar.name,
    });
    changes.profileImage = `/api/files/${stored.id}`;

    const previous = fileIdFromUrl(user.profileImage);
    if (previous) await deleteFile(previous, actor);
  }

  const updated = await updateUser(String(user._id), changes);
  return toPublicUser(updated);
}

/**
 * @param {{ _id: any, role: string }} actor
 * @param {unknown} input
 */
export async function deleteAccount(actor, input) {
  const { password } = parseInput(deleteAccountSchema, input);
  const user = await findUserById(String(actor._id), { withPassword: true });
  if (!user) throw new AppError("NOT_FOUND", "Kullanıcı bulunamadı.");

  if (!(await verifyPassword(password, user.password))) {
    throw new AppError("VALIDATION", "Şifre hatalı.", {
      fieldErrors: { password: ["Şifre hatalı."] },
    });
  }

  await deleteFilesOwnedBy(user._id);
  await revokeUserSessions(user._id);
  await deleteUserWithData(String(user._id));
}
