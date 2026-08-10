import apiClient from "@/shared/api";

export const taskApi = {
    getTask() {
    return apiClient.get("/meetings");
  },
  createTask(payload){
    return apiClient.post("/meetings",payload);
  }
}
