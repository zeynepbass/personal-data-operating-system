import {goalsApi} from "../features/goals/api/goal.api"

const goalProvider={
    getGoals:goalsApi.getGoals,
    postGoals:goalsApi.postGoals
}

export default goalProvider