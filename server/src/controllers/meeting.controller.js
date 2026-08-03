import {getMeeting} from "../services/meeting.services.js";

export const getMeetings = async (req, res) => {
  try {
    const meetings = await getMeeting();

    res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Meetings alınırken hata oluştu.",
      error: error.message,
    });
  }
};

