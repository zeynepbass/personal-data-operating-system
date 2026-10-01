import { getToday as today } from "@/shared/helpers/format.helper";

export function transformTasksToRows(data = []) {
  return data.flatMap((meeting) =>
    (meeting.tasks ?? []).map((task) => ({
      ...task,
      meetingTitle: meeting.title,
      columnId: meeting.id,
    })),
  );
}

export function getTodayTasks(data = [], userId) {
  if (!userId) return [];
  const day = today();

  return data
    .flatMap((meeting) => meeting.tasks ?? [])
    .filter((task) => task.status === "todo" && task.date === day && task.assignee?.id === userId);
}

const COLUMNS = [
  { id: "todo", name: "todo", title: "Todo", color: "green" },
  { id: "in-progress", name: "in-progress", title: "In Progress", color: "purple" },
  { id: "done", name: "done", title: "Done", color: "orange" },
];

export function groupTasksByStatus(data = []) {
  const tasks = data.flatMap((meeting) => meeting.tasks ?? []);
  return COLUMNS.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.id),
  }));
}
