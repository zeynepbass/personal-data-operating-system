import apiClient from "@/shared/api";

export const taskApi = {
    getTask() {
    return apiClient.get("/meetings");
  },
  createTask(payload){
    return apiClient.post("/meetings",payload);
  },
  updatedTask(id,payload){
    return apiClient.put(`/meetings/${id}`,payload);
  },
  updateEventDetails(id,payload){
    return apiClient.put(`/meetings/${id}/details`,payload);
  },
  deletedTask(id){
    return apiClient.delete(`/meetings/${id}`);
  },
  updateTaskStatus(id,name){
    return apiClient.patch(`/meetings/${id}/status`,
      { name });
  },
 updateTaskCompleted (id, data){
    return apiClient.patch(`/meetings/${id}/status`,data)
 }
}