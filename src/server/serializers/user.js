/**
 * @typedef {{
 *   id: string,
 *   fullName: string,
 *   email: string,
 *   role: "user" | "admin",
 *   about: string,
 *   profileImage: string,
 *   passwordChangedAt: string | null,
 * }} PublicUser
 */

/**
 * @param {any} user
 * @returns {PublicUser | null}
 */
export function toPublicUser(user) {
  if (!user) return null;

  return {
    id: String(user._id ?? user.id),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    about: user.about ?? "",
    profileImage: user.profileImage ?? "",
    passwordChangedAt: user.passwordChangedAt ? new Date(user.passwordChangedAt).toISOString() : null,
  };
}
