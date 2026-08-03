import {getEvent} from "../services/event.services.js";

export const getEvents = async (req, res) => {
  try {
    const events = await getEvent();

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Events alınırken hata oluştu.",
      error: error.message,
    });
  }
};

