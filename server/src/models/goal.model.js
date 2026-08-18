import mongoose from "mongoose";

const goalItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const goalSchema = new mongoose.Schema(
  {
    // Goal hangi kullanıcıya ait?
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    items: {
      type: [goalItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;