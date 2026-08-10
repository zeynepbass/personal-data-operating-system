export function tasksAdapter(meeting) {

    return {
      id: meeting._id,
      name:meeting.name,
      title: meeting.title,
      color: meeting.color,
      meeting: meeting.meeting?.trim(),
      meetingDetails: meeting.meetingDetails,
      meetingCalendar: meeting.meetingCalendar,
      tasks: meeting.tasks?.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        label: task.label,
        priority: task.priority,
        date: task.date,
        startDate: task.startDate,
        dueDate: task.dueDate,
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
  };

export function documentAdapter(document){

  return{
    id: document._id,
    title: document.name,
    type: document.type,
    size: document.size,
    date: document.date,
    icon: document.icon,
    color: document.color,
    favorite: document.favorite,
    shared: document.shared,
  }
}