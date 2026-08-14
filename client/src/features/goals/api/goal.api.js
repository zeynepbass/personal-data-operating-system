import apiClient from "@/shared/api"
export const goalsApi={
    getGoals(){
        return apiClient.get("/goals");
    },
    postGoals(data){
        return apiClient.post("/goals",data);
    },
    deletedGoals(id){
        return apiClient.delete(`/goals/${id}`);
    },
    updateGoals(id,data){

        return apiClient.patch(`/goals/${id}`,data);
    }
}