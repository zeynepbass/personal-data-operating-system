import {goalsApi} from "../features/goals/api/goal.api"

const goalProvider={
    getGoals:goalsApi.getGoals,
    postGoals:goalsApi.postGoals,
    deletedGoals:goalsApi.deletedGoals,
    updateGoals:goalsApi.updateGoals
}

export default goalProvider