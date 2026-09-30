import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api/legacy",
});

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;
    const isMeCheck = error.config?.url?.includes("/auth/me");

    if (typeof window !== "undefined") {
      if (status === 401 && !isMeCheck && window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
