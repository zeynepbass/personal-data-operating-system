import mongoose from "mongoose";

const goalCategorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const GoalCategory = mongoose.model("GoalCategory", goalCategorySchema);

export default GoalCategory;
