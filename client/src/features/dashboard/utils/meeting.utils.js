import {getToday} from "@/shared/helpers/format.helper"
  
export const getTodayMeetings = (meetings = []) => {
  const today = getToday();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  if (!userId) return [];

  return meetings
    .map((meeting) => {
      if (!meeting.meetingCalendar) return null;

      const meetingDate = new Date(meeting.meetingCalendar)
        .toISOString()
        .split("T")[0];

      if (meetingDate !== today) return null;

      const userTasks = (meeting.tasks ?? []).filter(
        (task) => task.assignee?.id === userId
      );

      if (userTasks.length === 0) return null;

      return {
        ...meeting,
        tasks: userTasks,
      };
    })
    .filter(Boolean);
};
  export const getTodayTasks = (meetings = []) => {
    const today = getToday();
  
    return meetings
      .flatMap((item) => item.tasks ?? [])
      .filter((task) => {
        if (!task.date) return false;
  
        const taskDate = new Date(task.date)
          .toISOString()
          .split("T")[0];
  
        return taskDate === today;
      });
  };