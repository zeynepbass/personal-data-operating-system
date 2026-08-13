import {goalsApi} from "../features/goals/api/goal.api"

const goalProvider={
    getGoals:goalsApi.getGoals,
}

export default goalProvider