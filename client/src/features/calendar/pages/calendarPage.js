"use client";

import Calendar from "../components/Calendar";
import { useTasks } from "@/features/task/hooks/useTask";

export default function CalendarView() {
  const { data } = useTasks();

  const events =
  data?.flatMap((item) =>
    item.tasks?.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      start: task.startDate,
      end: task.dueDate || undefined,
      extendedProps: {
        description: task.description,
        priority: task.priority,
        start: task.startDate,
        end: task.dueDate || undefined,
        label: task.label,
        completed: task.completed,
        progress: task.progress,
        estimatedHours: task.estimatedHours,
        spentHours: task.spentHours,
        assignee: task.assignee,
      }})) || []
    ) ?? [];


  return <Calendar data={events} />;
}