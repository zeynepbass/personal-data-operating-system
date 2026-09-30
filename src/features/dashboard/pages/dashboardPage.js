"use client";

import { useMemo } from "react";

import { useCurrentUser } from "@/features/auth/context/AuthProvider";
import { getTodayMeetings } from "@/features/dashboard/utils/meeting.utils";
import { getTodayTasks } from "@/features/task/utils/colums.filter";

import DashboardHome from "../components/DashboardHome";

export default function DashboardPage({ meetings = [] }) {
  const userId = useCurrentUser()?.id;
  const filteredMeeting = getTodayMeetings(meetings, userId);
  const filteredData = useMemo(() => getTodayTasks(meetings, userId), [meetings, userId]);

  return <DashboardHome filteredData={filteredData} filteredMeeting={filteredMeeting} />;
}
