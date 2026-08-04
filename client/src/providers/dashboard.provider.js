import {
  getDocument,
  getMeeting,
} from "../features/dashboard/api/dashboard.api";

export const dashboardProvider = {
  getMeetingApi: getMeeting,
  getDocumentApi: getDocument,
};

