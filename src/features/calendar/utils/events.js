/**
 * @param {Array<{ tasks: any[] }>} board
 */
export function toCalendarEvents(board = []) {
  return board.flatMap((meeting) =>
    (meeting.tasks ?? []).map((task) => ({
      id: task.id,
      title: task.title,
      start: task.startDate ?? task.date,
      end: task.dueDate ?? undefined,
      extendedProps: {
        description: task.description,
        priority: task.priority,
        start: task.startDate,
        end: task.dueDate ?? undefined,
        label: task.label,
        completed: task.completed,
        progress: task.progress,
        estimatedHours: task.estimatedHours,
        spentHours: task.spentHours,
        assignee: task.assignee,
      },
    })),
  );
}
