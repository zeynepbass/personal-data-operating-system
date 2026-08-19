import apiClient from "@/shared/api"

export const taskStagesApi = {
    getTaskStages() {
        return apiClient.get("/task-stages");
    },
    postTaskStage(data) {
        return apiClient.post("/task-stages", data);
    },
    deletedTaskStage(id) {
        return apiClient.delete(`/task-stages/${id}`);
    },
}
