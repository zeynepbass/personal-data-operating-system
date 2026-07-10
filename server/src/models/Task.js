import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
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

    title: {
      type: String,
      required: true,
    },

    description: String,

    calendarDate: Date,

    time: String,

    lastNotes: String,

    calendarDescription: String,

    label: {
      type: String,
      enum: ["Frontend", "Backend", "Meeting", "Personal"],
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