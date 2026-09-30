import "server-only";
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    title: { type: String, required: true, trim: true },
    color: { type: String, default: "green" },
    meeting: { type: String, default: "" },
    meetingDetails: { type: String, default: "" },
    meetingCalendar: { type: Date, default: null },
  },
  { timestamps: true },
);

meetingSchema.index({ meetingCalendar: 1 });
meetingSchema.index({ createdAt: -1, _id: -1 });

export const Meeting = mongoose.models.Meeting ?? mongoose.model("Meeting", meetingSchema);
