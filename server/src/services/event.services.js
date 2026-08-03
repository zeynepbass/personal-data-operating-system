import Event from "../models/event.model.js";

export const getEvent = async () => {
  return await Event.find();
};

