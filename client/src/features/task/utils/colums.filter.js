import { getRelativeTime } from "@/shared/helpers/format.helper";

function isEventColumn(column) {
  return Boolean(
    column.meeting || column.meetingCalendar || column.meetingDetails
  );
}

function toEventItem(column) {
  return {
    id: column.id,
    itemType: "event",
    title: column.meetingDetails || "Etkinlik",
    meeting: column.meeting,
    meetingCalendar: column.meetingCalendar,
    meetingNotes: column.meetingNotes,
    relativeTime: getRelativeTime(column.meetingCalendar, column.meeting),
    status: column.name,
    statusColor: column.color,
    name: column.name,
    columnId: column.id,
    date: column.meetingCalendar,
  };
}

export function transformTasksToRows(data = []) {
  const taskRows = data.flatMap((column) =>
    column.tasks.map((task) => ({
      ...task,
      itemType: "task",
      status: column.name,
      statusColor: column.color,
      name: column.name,
      columnId: column.id,
    }))
  );

  const eventRows = data.filter(isEventColumn).map(toEventItem);

  return [...taskRows, ...eventRows];
}
export function getTodayTasks(data = []) {
  const tasks = data.flatMap((column) => column.tasks ?? []);
  const events = data.filter(isEventColumn).map(toEventItem);

  return [...tasks, ...events];
}
export function groupTasksByStatus(data = [], stages = []) {
  const groups = {};

  stages.forEach((stage) => {
    groups[stage.name] = {
      id: stage.name,
      name: stage.name,
      title: stage.title,
      color: stage.color,
      tasks: [],
    };
  });

  data.forEach((column) => {
    const name = column.name?.toLowerCase();

    if (!groups[name]) return;

    groups[name].tasks.push(...(column.tasks ?? []));
  });

  return Object.values(groups);
}
