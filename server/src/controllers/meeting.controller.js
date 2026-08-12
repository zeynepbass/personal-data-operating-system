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
      
      id: `${Date.now()}`,
      title,
      name,
      color,
      meeting,
      meetingCalendar: meetingCalendar
        ? new Date(meetingCalendar)
        : null,
      meetingDetails,

      tasks: tasks.map((task) => ({
        id: `${Date.now()}`,
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
export const updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      label,
      priority,
      date,
      startDate,
      dueDate,
      estimatedHours,
      storyPoints,
      completed,
      progress,
      spentHours,
      assignee,
    } = req.body;

    const meeting = await Meeting.findOne({
      "tasks.id": id,
    });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }

    const task = meeting.tasks.find(
      (task) => String(task.id) === String(id)
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }

    task.title = title;
    task.description = description;
    task.label = label;
    
    task.priority = priority;
    task.date = date ? new Date(date) : null;
    task.startDate = startDate
      ? new Date(startDate)
      : null;
    task.dueDate = dueDate
      ? new Date(dueDate)
      : null;
    task.estimatedHours =
      Number(estimatedHours) || 0;
    task.storyPoints =
      Number(storyPoints) || 0;

    if (completed !== undefined) {
      task.completed = completed;
    }

    if (progress !== undefined) {
      task.progress = Number(progress) || 0;
    }

    if (spentHours !== undefined) {
      task.spentHours = Number(spentHours) || 0;
    }

    if (assignee !== undefined) {
      task.assignee = assignee;
    }

    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Task başarıyla güncellendi.",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task güncellenirken hata oluştu.",
      error: error.message,
    });
  }
};
export const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findOne({
      "tasks.id": id,
    });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }

    meeting.tasks = meeting.tasks.filter(
      (task) => task.id !== id
    );

    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Task başarıyla silindi.",
      data: meeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task silinirken hata oluştu.",
      error: error.message,
    });
  }
};
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, completed } = req.body;


    const currentMeeting = await Meeting.findOne({
      "tasks.id": id,
    });

    if (!currentMeeting) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }


    const task = currentMeeting.tasks.find(
      (item) => String(item.id) === String(id)
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }


    if (completed === true) {
      const doneMeeting = await Meeting.findOne({
        name: "done",
      });

      if (!doneMeeting) {
        return res.status(404).json({
          success: false,
          message: "Done kolonu bulunamadı.",
        });
      }

      task.completed = true;

      currentMeeting.tasks = currentMeeting.tasks.filter(
        (item) => String(item.id) !== String(id)
      );

      doneMeeting.tasks.push(task);

      await currentMeeting.save();
      await doneMeeting.save();

      return res.status(200).json({
        success: true,
        message: "Task tamamlandı.",
        data: doneMeeting,
      });
    }


    if (name) {
      const targetMeeting = await Meeting.findOne({
        name: name,
      });

      if (!targetMeeting) {
        return res.status(404).json({
          success: false,
          message: `Hedef kolon bulunamadı: ${name}`,
        });
      }

      task.completed = name !== "todo";

      currentMeeting.tasks = currentMeeting.tasks.filter(
        (item) => String(item.id) !== String(id)
      );

      targetMeeting.tasks.push(task);

      await currentMeeting.save();
      await targetMeeting.save();

      return res.status(200).json({
        success: true,
        message: "Task durumu güncellendi.",
        data: targetMeeting,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Güncellenecek bilgi gönderilmedi.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Task durumu güncellenemedi.",
      error: error.message,
    });
  }
};