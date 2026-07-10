import Task from "../models/Task.js";



export const getTaskById = async (id) => {
  return await Task.findById(id);
};

export const createTask = async (data) => {
    return await Task.create(data);
  };
  
  export const getTasks = async (userId) => {
    return await Task.find({ user: userId });
  };
export const updateTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};