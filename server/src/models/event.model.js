import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    start: {
      type: Date,
      required: true,
    },

    allDay: {
      type: Boolean,
      default: true,
    },

    backgroundColor: {
      type: String,
    },

    borderColor: {
      type: String,
    },

    textColor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;