import apiClient from "@/shared/api";

export const taskApi = {
    getTask() {
    return apiClient.get("/meetings");
  }
}
