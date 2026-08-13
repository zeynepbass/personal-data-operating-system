import apiClient from "@/shared/api"
export const goalsApi={
    getGoals(){
        return apiClient.get("/goals");
    }
}