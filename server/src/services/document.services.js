
import Documents from "../models/document.model.js";

export const getDocument= async () => {
  return await Documents.find();
};

