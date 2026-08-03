import Meeting from "../models/meeting.model.js";

export const getMeeting = async () => {
  return await Meeting.find();
};

