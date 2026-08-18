import Goal from "../models/goal.model.js";



export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Goals başarıyla getirildi.",
      data: goals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Goals alınırken hata oluştu.",
      error: error.message,
    });
  }
};



export const createGoal = async (req, res) => {
  try {
    const goal = await Goal.create({
      user: req.user._id,

      status: req.body.status,
      category: req.body.category,
      title: req.body.title,
      items: req.body.items,
    });

    return res.status(201).json({
      success: true,
      message: "Goal başarıyla oluşturuldu.",
      data: goal,
    });
  } catch (error) {
    console.error("CREATE GOAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Goal oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};



export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal bulunamadı.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Goal başarıyla silindi.",
      data: goal,
    });
  } catch (error) {
    console.error("DELETE GOAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Goal silinirken hata oluştu.",
      error: error.message,
    });
  }
};



export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const items = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Items array olmalıdır.",
      });
    }

    const goal = await Goal.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: "Goal bulunamadı.",
      });
    }

    const totalValue = items.reduce(
      (total, item) =>
        total + Number(item.value || 0),
      0
    );

    goal.items = items;

    if (totalValue === 100) {
      goal.status = "completed";
    } else if (totalValue < 100) {
      goal.status = "active";
    } else {
      goal.status = "all";
    }

    await goal.save();

    return res.status(200).json({
      success: true,
      message: "Goal başarıyla güncellendi.",
      data: goal,
    });
  } catch (error) {
    console.error("UPDATE GOAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Goal güncellenirken hata oluştu.",
      error: error.message,
    });
  }
};