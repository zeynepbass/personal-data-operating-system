import apiClient from "@/shared/api";
export async function getDocument(){
const response=await apiClient.get("/documents")
return response.data.data
}