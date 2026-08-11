
import apiClient from "@/shared/api/client";

export const documentApi = {
    getDocument() {
    return apiClient.get("/documents");
  },

  createDocument(data) {
    return apiClient.post("/documents", data);
  },
  deleteDocument(id){
    return apiClient.delete(`/documents/${id}`);
  }
};