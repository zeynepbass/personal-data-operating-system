import { getToday } from "@/shared/helpers/format.helper";

export const getTodayMeetings = (meetings = [], userId) => {
  const today = getToday();

  if (!userId) return [];

  return meetings
    .map((meeting) => {
      if (!meeting.meetingCalendar) return null;

      const meetingDate = new Date(meeting.meetingCalendar).toISOString().split("T")[0];

      if (meetingDate !== today) return null;

      const userTasks = (meeting.tasks ?? []).filter((task) => task.assignee?.id === userId);

      if (userTasks.length === 0) return null;

      return {
        ...meeting,
        tasks: userTasks,
      };
    })
    .filter(Boolean);
};
