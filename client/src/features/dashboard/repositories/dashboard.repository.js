import { tasksAdapter,documentAdapter } from "../adapters/dashboard.adapter";

export function createmeetingRepository(provider) {
  return {
    async getAllMeetings() {
      const response = await provider.getMeetingApi();

      return response.map(tasksAdapter);
    },
  };
}

export function createDocumentRepository(provider) {
  return {
    async getAllDocuments() {
      const response = await provider.getDocumentApi();

      return response.map(documentAdapter);


    },
  };
}
