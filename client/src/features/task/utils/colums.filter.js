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
  const todoColumn = data.find(
    (column) => column.title?.toLowerCase() === "todo"
  );

  return todoColumn?.tasks ?? [];
}