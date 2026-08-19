import {
  getToday,
  getTomorrow,
  getWeekRange,
  getMonthRange,
} from "@/shared/helpers/format.helper";

export const emptyTaskFilters = {
  type: "",
  stage: "",
  priority: "",
  dateOperator: "between",
  date: getToday(),
  dateTo: getToday(),
};

export const datePresets = [
  {
    key: "today",
    label: "Bugün",
    getRange: () => ({ from: getToday(), to: getToday() }),
  },
  {
    key: "tomorrow",
    label: "Yarın",
    getRange: () => ({ from: getTomorrow(), to: getTomorrow() }),
  },
  {
    key: "week",
    label: "Bu Hafta",
    getRange: () => getWeekRange(),
  },
  {
    key: "month",
    label: "Bu Ay",
    getRange: () => getMonthRange(),
  },
];

export function getActiveDatePresetLabel(filters) {
  if (!filters.date || !filters.dateTo || filters.dateOperator !== "between") {
    return null;
  }

  const match = datePresets.find((preset) => {
    const range = preset.getRange();
    return range.from === filters.date && range.to === filters.dateTo;
  });

  return match?.label ?? null;
}

function isEventColumn(column) {
  return Boolean(
    column.meeting || column.meetingCalendar || column.meetingDetails
  );
}

function startOfDay(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function endOfDay(dateString) {
  return new Date(`${dateString}T23:59:59.999`);
}

export function filterMeetings(data = [], filters = emptyTaskFilters) {
  return data.filter((column) => {
    const isEvent = isEventColumn(column);
    const task = column.tasks?.[0];

    if (filters.type === "task" && isEvent) return false;
    if (filters.type === "event" && !isEvent) return false;

    if (filters.stage && column.name !== filters.stage) return false;

    if (filters.priority) {
      if (isEvent) return false;
      if (task?.priority !== filters.priority) return false;
    }

    const compareDate = isEvent ? column.meetingCalendar : task?.date;

    if (filters.date && compareDate) {
      const targetDate = new Date(compareDate);

      if (filters.dateOperator === "gte") {
        if (targetDate < startOfDay(filters.date)) return false;
      } else if (filters.dateOperator === "lte") {
        if (targetDate > endOfDay(filters.date)) return false;
      } else if (filters.dateOperator === "between" && filters.dateTo) {
        if (
          targetDate < startOfDay(filters.date) ||
          targetDate > endOfDay(filters.dateTo)
        )
          return false;
      }
    }

    return true;
  });
}

export function countActiveTaskFilters(filters) {
  let count = 0;

  if (filters.type) count += 1;
  if (filters.stage) count += 1;
  if (filters.priority) count += 1;
  if (filters.date) count += 1;

  return count;
}
