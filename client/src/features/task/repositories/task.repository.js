
import taskProvider from "@/providers/task.provider.js";
import { tasksAdapter } from "../adapters/task.adapter";

export async function getTask() {
    const response = await taskProvider.getTask();

    return response.data.data.map(tasksAdapter);
}
export async function createTask(payload){

    const response=await taskProvider.postTask(payload);
    return response.data
}