export function tasksAdapter(meeting) {
  return {
    id: meeting._id,
    name: meeting.name,
    title: meeting.title,
    color: meeting.color,
    meeting: meeting.meeting?.trim(),
    meetingDetails: meeting.meetingDetails,
    meetingCalendar: meeting.meetingCalendar
      ? new Date(meeting.meetingCalendar).toISOString().split("T")[0]
      : null,

    tasks: meeting.tasks?.map((task) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      label: task.label,
      priority: task.priority,

      date: task.date
        ? new Date(task.date).toISOString().split("T")[0]
        : null,

      startDate: task.startDate
        ? new Date(task.startDate).toISOString().split("T")[0]
        : null,

      dueDate: task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : null,

      estimatedHours: task.estimatedHours,
      spentHours: task.spentHours,
      progress: task.progress,
      storyPoints: task.storyPoints,
      completed: task.completed,

      assignee: task.assignee
        ? {
            id: task.assignee.id,
            fullName: task.assignee.fullName,
            role: task.assignee.role,
            avatar: task.assignee.avatar,
            status: task.assignee.status,
          }
        : null,
    })),
  };
}