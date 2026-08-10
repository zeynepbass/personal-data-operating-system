export function transformTasksToRows(data = []) {
  return data.flatMap((column) =>
    column.tasks.map((task) => ({
      ...task,
      status: column.title,
      statusColor: column.color,
      columnId: column.id,
    }))
  );
}
export function getTodayTasks(data = []) {
  return data
    .filter((column) => column.name?.toLowerCase() === "todo")
    .flatMap((column) => column.tasks ?? []);
}
export function groupTasksByStatus(data = []) {
  const groups = {
    todo: {
      id: "todo",
      name: "todo",
      title: "Todo",
      color: "green",
      tasks: [],
    },

    "in-progress": {
      id: "in-progress",
      name: "in-progress",
      title: "In Progress",
      color: "purple",
      tasks: [],
    },

    done: {
      id: "done",
      name: "done",
      title: "Done",
      color: "red",
      tasks: [],
    },
  };

  data.forEach((column) => {
    const name = column.name?.toLowerCase();

    if (!groups[name]) return;

    groups[name].tasks.push(...(column.tasks ?? []));
  });

  return Object.values(groups);
}