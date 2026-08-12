import Goal from "../models/goal.model.js";


export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });

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


export const createGoal = async (req, res) => {
  try {
    const {
      id,
      status,
      category,
      title,
      progress,
      color,
      items,
    } = req.body;

    const goal = await Goal.create({
      id,
      status,
      category,
      title,
      progress,
      color,
      items,
    });

    res.status(201).json({
      success: true,
      message: "Goal başarıyla oluşturuldu.",
      data: goal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Goal oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};