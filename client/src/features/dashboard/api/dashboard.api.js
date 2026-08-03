import apiClient from "@/shared/api"

export async function getMeeting(){
    const response=await apiClient.get("/meetings");

    return response.data.data
}