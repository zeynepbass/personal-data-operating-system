import goalProvider from "@/providers/goal.provider";
import {goalAdapter} from "../adapters/goal.adapter"

export async function getAll(){
    const response=await goalProvider.getGoals();
    return response.data.data.map(goalAdapter)
}
export async function postGoals(data){
    const response=await goalProvider.postGoals(data);
    return response.data;
}
export async function deletedGoals(id){
    const response=await goalProvider.deletedGoals(id);
    return response.data
}