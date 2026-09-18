import { create } from "zustand";
import { authContainer } from "@/features/auth/auth.container";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  login: (data) => {
    localStorage.setItem("user", JSON.stringify(data.user));

    set({
      user: data.user,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");

    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initializeAuth: async () => {
    try {
      const response = await authContainer.me();

      localStorage.setItem("user", JSON.stringify(response.data));

      set({
        user: response.data,
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch {
      localStorage.removeItem("user");

      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },
}));
