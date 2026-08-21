import  {taskApi} from "../features/task/api/task.api";

const taskProvider = {
    getTask: taskApi.getTask,
    getUsers:taskApi.getUsers,
    postTask:taskApi.createTask,
    updatedTask:taskApi.updatedTask,
    deletedTask:taskApi.deletedTask,
    updateTaskStatus:taskApi.updateTaskStatus,
    updateTaskCompleted:taskApi.updateTaskCompleted,
    getNotification:taskApi.getNotification
};

export default taskProvider;