
import taskProvider from "@/providers/task.provider.js";
import { meetingAdapter } from "../adapters/task.adapter";

export async function getTask() {
    const response = await taskProvider.getTask();

    return response.data.data.map(meetingAdapter);
}
