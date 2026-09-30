"use client";

import { createContext, useContext } from "react";

/** @type {import("react").Context<import("@/server/serializers/user").PublicUser | null>} */
const AuthContext = createContext(null);

/**
 * @param {{ user: import("@/server/serializers/user").PublicUser, children: import("react").ReactNode }} props
 */
export function AuthProvider({ user, children }) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useCurrentUser() {
  return useContext(AuthContext);
}
