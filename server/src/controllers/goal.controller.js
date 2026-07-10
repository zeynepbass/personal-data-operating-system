import * as goalService from "../services/goal.service.js";

export const getGoals = async (req, res) => {
  try {
    const goals = await goalService.getGoals(req.params.userId);

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createGoal = async (req, res) => {
  try {
    const goal = await goalService.createGoal(req.body);

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await goalService.updateGoal(req.params.id, req.body);

    if (!goal) {
      return res.status(404).json({
        message: "Hedef bulunamadı",
      });
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const goal = await goalService.deleteGoal(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Hedef bulunamadı",
      });
    }

    res.status(200).json({
      message: "Hedef silindi",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};