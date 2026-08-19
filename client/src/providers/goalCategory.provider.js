import { goalCategoriesApi } from "../features/goals/api/goalCategory.api"

const goalCategoryProvider = {
    getGoalCategories: goalCategoriesApi.getGoalCategories,
    postGoalCategory: goalCategoriesApi.postGoalCategory,
    deletedGoalCategory: goalCategoriesApi.deletedGoalCategory,
}

export default goalCategoryProvider
