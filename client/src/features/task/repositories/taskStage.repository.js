import taskStageProvider from "@/providers/taskStage.provider";
import { taskStageAdapter } from "../adapters/taskStage.adapter"

export async function getAll() {
    const response = await taskStageProvider.getTaskStages();
    return response.data.data.map(taskStageAdapter)
}
export async function postTaskStage(data) {
    const response = await taskStageProvider.postTaskStage(data);
    return response.data;
}
export async function deletedTaskStage(id) {
    const response = await taskStageProvider.deletedTaskStage(id);
    return response.data
}
