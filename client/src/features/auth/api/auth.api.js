import apiClient from "@/shared/api";

export const authApi = {
  login(data) {
    return apiClient.post("/auth/login", data);
  },

  register(data) {
    return apiClient.post("/auth/register", data);
  },
  password(data){
    return apiClient.post("/auth/forgot-password", data);
  },
  profile(id){
    return apiClient.post(`/auth/${id}/profile`);
  }
};