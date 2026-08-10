import  {taskApi} from "../features/task/api/task.api";

const documentProvider = {
    getTask: taskApi.getTask,
    postTask:taskApi.createTask
};

export default documentProvider;