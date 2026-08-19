import  {taskApi} from "../features/task/api/task.api";

const taskProvider = {
    getTask: taskApi.getTask,
    postTask:taskApi.createTask,
    updatedTask:taskApi.updatedTask,
    updateEventDetails:taskApi.updateEventDetails,
    deletedTask:taskApi.deletedTask,
    updateTaskStatus:taskApi.updateTaskStatus,
    updateTaskCompleted:taskApi.updateTaskCompleted
};

export default taskProvider;