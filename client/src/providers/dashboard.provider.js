
import  {taskApi} from "../features/task/api/task.api";
import  {documentApi} from "../features/documents/api/documents";
export const dashboardProvider = {
  getMeetingApi: taskApi.getTask,
  getDocumentApi: documentApi.getDocument,
};

