import  {taskApi} from "../features/task/api/task.api";

const documentProvider = {
    getTask: taskApi.getTask
};

export default documentProvider;