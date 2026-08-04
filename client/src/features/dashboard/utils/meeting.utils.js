import {getToday} from "@/shared/helpers/format.helper"
  
  export const getTodayMeetings = (meetings = []) => {
    const today = getToday();
  
    return meetings.filter((item) => {
      if (!item.meetingCalendar) return false;
  
      const meetingDate = new Date(item.meetingCalendar)
        .toISOString()
        .split("T")[0];
  
      return meetingDate === today;
    });
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