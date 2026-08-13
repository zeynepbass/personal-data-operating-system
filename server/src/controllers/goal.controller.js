import Goal from "../models/goal.model.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Başarılı şekilde kayıt edildi",
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

    const goal = await Goal.create({
      status: req.body.status,
      category: req.body.category,
      title: req.body.title,
      items: req.body.items,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Goal başarıyla oluşturuldu.",
        data: goal,
      });
  } catch (error) {
    console.error("CREATE GOAL ERROR:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Goal oluşturulurken hata oluştu.",
        error: error.message,
      });
  }
};
