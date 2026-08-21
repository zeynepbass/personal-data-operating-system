export function transformTasksToRows(data = []) {
  return data.flatMap((column) =>
    column.tasks.map((task) => ({
      ...task,
      status: column.name,
      statusColor: column.color,
      name: column.name,
      columnId: column.id,
    }))
  );
}

export function getTodayTasks(data = []) {
  const today = new Date().toISOString().split("T")[0];

  return data
    .filter((column) => column.name?.toLowerCase() === "todo")
    .flatMap((column) => column.tasks ?? [])
    .filter((task) => {
      if (!task.date) return false;

      return new Date(task.date).toISOString().split("T")[0] === today;
    });
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