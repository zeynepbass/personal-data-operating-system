
import Goal from "../models/goal.model.js";

export const getGoal = async () => {
  return await Goal.find();
};

