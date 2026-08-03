import mongoose from "mongoose";

const assigneeSchema = new mongoose.Schema(
  {
    id: String,
    fullName: String,
    role: String,
    avatar: String,
    status: String,
  },
  {
    _id: false,
  }
);

const taskSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    label: String,
    priority: String,

    date: Date,
    startDate: Date,
    dueDate: Date,

    estimatedHours: Number,
    spentHours: Number,
    progress: Number,
    storyPoints: Number,

    completed: Boolean,

    assignee: {
      type: assigneeSchema,
    },
  },
  {
    _id: false,
  }
);

const meetingSchema = new mongoose.Schema(
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

    title: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    meeting: String,

    meetingDetails: String,

    meetingCalendar: Date,

    tasks: {
      type: [taskSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;