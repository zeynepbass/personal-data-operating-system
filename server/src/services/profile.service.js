import User from "../models/User.js";

export const getProfile = async (id) => {
  return await User.findById(id);
};

export const createProfile = async (data) => {
  return await User.create(data);
};

export const updateProfile = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};