
import apiClient from "@/shared/api";

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
