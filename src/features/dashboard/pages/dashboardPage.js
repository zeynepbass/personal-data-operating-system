"use client";

import { useMemo } from "react";

import { getTodayMeetings } from "@/features/dashboard/utils/meeting.utils";
import { getTodayTasks } from "@/features/task/utils/colums.filter";

import DashboardHome from "../components/DashboardHome";

export default function DashboardPage({ meetings = [] }) {
  const filteredMeeting = getTodayMeetings(meetings);

  const filteredData = useMemo(() => getTodayTasks(meetings), [meetings]);
  return <DashboardHome filteredData={filteredData} filteredMeeting={filteredMeeting} />;
}
