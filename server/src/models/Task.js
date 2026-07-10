import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    calendarDate: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    lastNotes: {
      type: String,
      default: "",
    },

    calendarDescription: {
      type: String,
      default: "",
    },

    label: {
      type: String,
      enum: ["Frontend", "Backend", "Meeting", "Personal"],
      default: "Personal",
    },

    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", taskSchema);