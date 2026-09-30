import { getAll } from "@/features/documents/repositories/document.repository";
import { getTask } from "@/features/task/repositories/task.repository";

import documentProvider from "../../providers/documents.provider";
import taskProvider from "../../providers/task.provider";

export const dashboardRepository = {
  getTask: () => getTask(taskProvider),
  getAll: () => getAll(documentProvider),
};
