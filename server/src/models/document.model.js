import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
    },

    color: {
      type: String,
    },
    pdf: {
      type: String,
      required: true,
    },

    favorite: {
      type: Boolean,
      default: false,
    },

    shared: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;