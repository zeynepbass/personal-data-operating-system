import Meeting from "../models/meeting.model.js";

export const getMeeting = async () => {
  const meetings = await Meeting.find();

  console.log("DB RESULT:", meetings);

  return meetings;
};