
import taskProvider from "@/providers/task.provider.js";
import { tasksAdapter } from "../adapters/task.adapter";

export async function getTask() {
    const response = await taskProvider.getTask();

    return response.data.data.map(tasksAdapter);
}

export async function getUsers() {
    const response = await taskProvider.getUsers();

    return response.data.data
}
export async function createTask(payload){

    const response=await taskProvider.postTask(payload);
    return response.data
}
export async function updateTask(id,payload){

    const response=await taskProvider.updatedTask(id,payload);
    return response.data
}
export async function deletedTask(id){
    const response=await taskProvider.deletedTask(id);
    return response.data
}
export async function updateTaskStatus(id, name){
    const response=await taskProvider.updateTaskStatus(id,name);
    return response.data
}

export async function updateTaskCompleted(id) {
    const response = await taskProvider.updateTaskCompleted(id, {
      completed: false,
      name: "done",
    });
  
    return response.data;
  }