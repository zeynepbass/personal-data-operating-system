import {getMeeting} from "../services/meeting.services.js";

export const getMeetings = async (req, res) => {
  try {
    console.log("GET /api/meetings ÇALIŞTI");

    const meetings = await getMeeting();

    console.log("MEETINGS:", meetings);

    res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    console.error("ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Meetings alınırken hata oluştu.",
      error: error.message,
    });
  }
};
