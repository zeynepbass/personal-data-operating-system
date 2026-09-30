"use client";

import { useMemo } from "react";

import { useCurrentUser } from "@/features/auth/context/AuthProvider";
import { useBoard } from "@/features/task/hooks/useTask";

import { buildActivity, filterTasksByDuration, summarizeStatuses } from "../../utils/focus.utils";

import ActivityChart from "./ActivityChart";
import FocusStats from "./FocusStats";

export default function DashboardFocus({ duration }) {
  const { data = [], isLoading } = useBoard();
  const userId = useCurrentUser()?.id;

  const tasks = useMemo(
    () =>
      data.flatMap((meeting) => meeting.tasks ?? []).filter((task) => task.assignee?.id === userId),
    [data, userId],
  );

  const statistics = useMemo(
    () => summarizeStatuses(filterTasksByDuration(tasks, duration)),
    [tasks, duration],
  );
  const activity = useMemo(() => buildActivity(tasks, duration), [tasks, duration]);

  if (isLoading) {
    return (
      <p role="status" className="text-sm text-gray-500">
        Yükleniyor…
      </p>
    );
  }

  return (
    <>
      <FocusStats statistics={statistics} />
      <ActivityChart data={activity} duration={duration} />
    </>
  );
}
