import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  login: (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    set({
      token: data.token,
      user: data.user,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      set({
        token,
        user: JSON.parse(user),
        isAuthenticated: true,
        isInitialized: true,
      });

      return;
    }

    set({
      token: null,
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
}));