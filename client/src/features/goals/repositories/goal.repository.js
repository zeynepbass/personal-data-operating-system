import goalProvider from "@/providers/goal.provider";
import {goalAdapter} from "../adapters/goal.adapter"

export async function getAll(){
    const response=await goalProvider.getGoals();
    return response.data.data.map(goalAdapter)
}