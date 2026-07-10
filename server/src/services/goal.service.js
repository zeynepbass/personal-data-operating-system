import Goal from "../models/Goal.js";

export const getGoals = async (userId) => {
    return await Goal.find({
      user: userId,
    });
  };

export const createGoal = async (data) => {
  return await Goal.create(data);
};

export const updateGoal = async (id, data) => {
  return await Goal.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteGoal = async (id) => {
  return await Goal.findByIdAndDelete(id);
};