import goalCategoryProvider from "@/providers/goalCategory.provider";
import { goalCategoryAdapter } from "../adapters/goalCategory.adapter"

export async function getAll() {
    const response = await goalCategoryProvider.getGoalCategories();
    return response.data.data.map(goalCategoryAdapter)
}
export async function postGoalCategory(data) {
    const response = await goalCategoryProvider.postGoalCategory(data);
    return response.data;
}
export async function deletedGoalCategory(id) {
    const response = await goalCategoryProvider.deletedGoalCategory(id);
    return response.data
}
