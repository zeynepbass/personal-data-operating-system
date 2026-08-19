import TaskStage from "../models/taskStage.model.js";

const DEFAULT_STAGES = [
  { name: "todo", title: "Todo", color: "green", order: 0 },
  { name: "in-progress", title: "In Progress", color: "purple", order: 1 },
  { name: "done", title: "Done", color: "orange", order: 2 },
];

export const getTaskStages = async (req, res) => {
  try {
    let stages = await TaskStage.find({
      user: req.user._id,
    }).sort({
      order: 1,
      createdAt: 1,
    });

    if (stages.length === 0) {
      stages = await TaskStage.insertMany(
        DEFAULT_STAGES.map((stage) => ({
          ...stage,
          user: req.user._id,
        }))
      );
    }

    return res.status(200).json({
      success: true,
      message: "Görev aşamaları başarıyla getirildi.",
      data: stages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Görev aşamaları alınırken hata oluştu.",
      error: error.message,
    });
  }
};

export const createTaskStage = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const title = req.body.title?.trim();
    const color = req.body.color?.trim() || "purple";

    if (!name || !title) {
      return res.status(400).json({
        success: false,
        message: "Aşama adı ve başlığı gereklidir.",
      });
    }

    const count = await TaskStage.countDocuments({
      user: req.user._id,
    });

    const stage = await TaskStage.create({
      user: req.user._id,
      name,
      title,
      color,
      order: count,
    });

    return res.status(201).json({
      success: true,
      message: "Görev aşaması başarıyla oluşturuldu.",
      data: stage,
    });
  } catch (error) {
    console.error("CREATE TASK STAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Görev aşaması oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};

export const deleteTaskStage = async (req, res) => {
  try {
    const { id } = req.params;

    const stage = await TaskStage.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!stage) {
      return res.status(404).json({
        success: false,
        message: "Görev aşaması bulunamadı.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Görev aşaması başarıyla silindi.",
      data: stage,
    });
  } catch (error) {
    console.error("DELETE TASK STAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Görev aşaması silinirken hata oluştu.",
      error: error.message,
    });
  }
};
