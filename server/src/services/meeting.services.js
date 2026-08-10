import Meeting from "../models/meeting.model.js";

export const getMeeting = async () => {
  const meetings = await Meeting.find();

  return meetings;
};