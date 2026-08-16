
import apiClient from "@/shared/api/client";

export const notesApi = {
    getNotes() {
    return apiClient.get("/notes");
  },
  deleteNotes(id){
    return apiClient.delete(`/notes/${id}`);
  },
  createNotes(data){
 return apiClient.post("/notes",data);
  }
};