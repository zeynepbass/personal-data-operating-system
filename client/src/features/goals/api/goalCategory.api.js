import apiClient from "@/shared/api"

export const goalCategoriesApi = {
    getGoalCategories() {
        return apiClient.get("/goal-categories");
    },
    postGoalCategory(data) {
        return apiClient.post("/goal-categories", data);
    },
    deletedGoalCategory(id) {
        return apiClient.delete(`/goal-categories/${id}`);
    },
}
