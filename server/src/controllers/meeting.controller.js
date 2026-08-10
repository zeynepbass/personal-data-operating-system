import Meeting from "../models/meeting.model.js";

export const getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find().lean();

    return res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Meetings alınırken hata oluştu.",
      error: error.message,
    });
  }
};

export const createMeeting = async (req, res) => {

  try {
    const {
      title,
      name,
      color,
      meeting,
      meetingCalendar,
      meetingDetails,
      tasks = [],
    } = req.body;
 
    const newMeeting = await Meeting.create({
      
      id: `meeting-${Date.now()}`,
      title,
      name,
      color,
      meeting,
      meetingCalendar: meetingCalendar
        ? new Date(meetingCalendar)
        : null,
      meetingDetails,

      tasks: tasks.map((task) => ({
        id: task.id || `task-${Date.now()}`,
        title: task.title,
        description: task.description,
        label: task.label,
        priority: task.priority,
        date: task.date ? new Date(task.date) : null,
        startDate: task.startDate ? new Date(task.startDate) : null,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
        estimatedHours: Number(task.estimatedHours) || 0,
        spentHours: 0,
        progress: 0,
        storyPoints: Number(task.storyPoints) || 0,
        completed: false,
        assignee: null,
      })),
    });

    return res.status(201).json({
      success: true,
      message: "Meeting başarıyla oluşturuldu.",
      data: newMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Meeting oluşturulurken hata oluştu.",
      error: error.message,
    });
  }
};