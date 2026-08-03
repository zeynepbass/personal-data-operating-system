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
    id: {
      type: Number,
      required: true,
      unique: true,
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

    progress: {
      type: Number,
      default: 0,
    },

    color: {
      type: String,
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