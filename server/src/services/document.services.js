
import Documents from "../models/event.model.js";

export const getDocument= async () => {
  return await Documents.find();
};

