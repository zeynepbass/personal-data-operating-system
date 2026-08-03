import {getGoal} from "../services/goal.services.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await getGoal();

    res.status(200).json({
      success: true,
      data: goals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Goals alınırken hata oluştu.",
      error: error.message,
    });
  }
};

