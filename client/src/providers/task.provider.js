import  {taskApi} from "../features/task/api/task.api";

const documentProvider = {
    getTask: taskApi.getTask,
    postTask:taskApi.createTask,
    updatedTask:taskApi.updatedTask
};

export default documentProvider;