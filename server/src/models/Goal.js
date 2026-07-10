import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    goal: {
      type: String,
      required: true,
    },

    personalGoal: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Goal", goalSchema);