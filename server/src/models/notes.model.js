import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "code", "list", "quote"],
      default: "text",
    },

    content: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: null,
    },

    items: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    id: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    sections: {
      type: [sectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Note", noteSchema);