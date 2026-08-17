"use client";

import DashboardHome from "../components/DashboardHome";
import useNotes from "@/features/notes/hooks/useNotes";
import {
  getTodayMeetings,
  getTodayTasks,
} from "@/features/dashboard/utils/meeting.utils";

export default function DashboardPage({ meetings = [] }) {

  const filteredMeeting = getTodayMeetings(meetings);
  const filteredData = getTodayTasks(meetings);


  return (
    <DashboardHome

      filteredData={filteredData}
      filteredMeeting={filteredMeeting}


    />
  );
}
