import GoalCategory from "../models/goalCategory.model.js";

export const getGoalCategories = async (req, res) => {
  try {
    const categories = await GoalCategory.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Hedef kategorileri başarıyla getirildi.",
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Hedef kategorileri alınırken hata oluştu.",
      error: error.message,
    });
  }
};

export const createGoalCategory = async (req, res) => {
  try {
    const name = req.body.name?.trim();

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Kategori adı gereklidir.",
      });
    }

    const category = await GoalCategory.create({
      user: req.user._id,
      name,
    });

    return res.status(201).json({
      success: true,
      message: "Hedef kategorisi başarıyla oluşturuldu.",
      data: category,
    });
  } catch (error) {
    console.error("CREATE GOAL CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Hedef kategorisi oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};

export const deleteGoalCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await GoalCategory.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Hedef kategorisi bulunamadı.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Hedef kategorisi başarıyla silindi.",
      data: category,
    });
  } catch (error) {
    console.error("DELETE GOAL CATEGORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Hedef kategorisi silinirken hata oluştu.",
      error: error.message,
    });
  }
};
