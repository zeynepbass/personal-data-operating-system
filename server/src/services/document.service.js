import Document from "../models/Document.js";

export const getDocuments = async (userId) => {
    return await Document.find({
      user: userId,
    });
  };
export const createDocument = async (data) => {
  return await Document.create(data);
};

export const updateDocument = async (id, data) => {
  return await Document.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteDocument = async (id) => {
  return await Document.findByIdAndDelete(id);
};