import mongoose from "mongoose";

const taskStageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      required: true,
      default: "purple",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const TaskStage = mongoose.model("TaskStage", taskStageSchema);

export default TaskStage;
