
import apiClient from "@/shared/api/client";

export const notesApi = {
    getNotes() {
    return apiClient.get("/notes");
  }
};