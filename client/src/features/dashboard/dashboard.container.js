import taskProvider from "../../providers/task.provider";
import documentProvider from "../../providers/documents.provider";

import { getTask } from "@/features/task/repositories/task.repository";
import { getAll } from "@/features/documents/repositories/document.repository";

export const dashboardRepository = {
  getTask: () => getTask(taskProvider),
  getAll: () => getAll(documentProvider),
};