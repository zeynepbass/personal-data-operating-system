import { taskStagesApi } from "../features/task/api/taskStage.api"

const taskStageProvider = {
    getTaskStages: taskStagesApi.getTaskStages,
    postTaskStage: taskStagesApi.postTaskStage,
    deletedTaskStage: taskStagesApi.deletedTaskStage,
}

export default taskStageProvider
