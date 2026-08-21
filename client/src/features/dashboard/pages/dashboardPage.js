"use client";

import DashboardHome from "../components/DashboardHome";
import {
  getTodayMeetings
} from "@/features/dashboard/utils/meeting.utils";
import {
  getTodayTasks
} from "@/features/task/utils/colums.filter";
import { useMemo } from "react";
export default function DashboardPage({ meetings = [] }) {

  const filteredMeeting = getTodayMeetings(meetings);

  const filteredData = useMemo(
    () => getTodayTasks(meetings),
    [meetings]
  );
  return (
    <DashboardHome

      filteredData={filteredData}
      filteredMeeting={filteredMeeting}


    />
  );
}
