import Meeting from "../models/meeting.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
const isAssignee = (task, user) => String(task.assignee?.id) === String(user._id);

const canChangeTask = (task, user) => Boolean(task) && (user.role === "admin" || isAssignee(task, user));

const visibleMeeting = (meeting, user) => {
  const plain = meeting.toObject();
  if (user.role === "admin") return plain;
  return { ...plain, tasks: plain.tasks.filter((task) => isAssignee(task, user)) };
};

export const getMeetings = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      const meetings = await Meeting.find().sort({ createdAt: -1 }).lean();
      return res.status(200).json({ success: true, data: meetings });
    }

    const userId = String(req.user._id);
    const meetings = await Meeting.find({ "tasks.assignee.id": userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: meetings.map((meeting) => ({
        ...meeting,
        tasks: meeting.tasks.filter((task) => isAssignee(task, req.user)),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Meetings alınırken hata oluştu.",
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "user",
      _id: {
        $ne: req.user.id,
      },
    })
      .select("_id fullName email role")
      .sort({
        fullName: 1,
      });

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Kullanıcılar alınırken hata oluştu.",
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

    if (!tasks.length) {
      return res.status(400).json({
        success: false,
        message: "En az bir görev oluşturmalısınız.",
      });
    }

    const preparedTasks = [];

    for (const task of tasks) {
      if (!task.assignee) {
        return res.status(400).json({
          success: false,
          message: "Her görev için kullanıcı seçilmelidir.",
        });
      }

      const selectedUser = await User.findOne({
        email: task.assignee,
        role: "user",
      });

      if (!selectedUser) {
        return res.status(404).json({
          success: false,
          message: `${task.assignee} kullanıcısı bulunamadı.`,
        });
      }

      if (String(selectedUser._id) === String(req.user.id)) {
        return res.status(403).json({
          success: false,
          message: "Kendinize görev atayamazsınız.",
        });
      }

      preparedTasks.push({
        id: `${Date.now()}-${preparedTasks.length}`,

        title: task.title,
        description: task.description,
        label: task.label,
        priority: task.priority,

        date: task.date
          ? new Date(task.date)
          : null,

        startDate: task.startDate
          ? new Date(task.startDate)
          : null,

        dueDate: task.dueDate
          ? new Date(task.dueDate)
          : null,

        estimatedHours:
          Number(task.estimatedHours) || 0,

        spentHours: 0,
        progress: 0,

        storyPoints:
          Number(task.storyPoints) || 0,

        completed: false,

        assignee: {
          id: String(selectedUser._id),
          fullName: selectedUser.fullName,
          email: selectedUser.email,
          role: selectedUser.role,
          avatar: selectedUser.avatar,
          status: selectedUser.status,
        },
      });
    }

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

      tasks: preparedTasks,
    });


    const notifications = preparedTasks.map((task) => ({
      id: `${Date.now()}-${task.id}`,
    
      user: task.assignee.id,
    
      title: "Yeni görev atandı",
    
      message: `"${task.title}" görevi size atandı.`,
    
      meetingId: newMeeting.id,
    
      taskId: task.id,
    
      read: false,
    }));
    
    await Notification.insertMany(notifications);


    return res.status(201).json({
      success: true,
      message: "Meeting ve görev başarıyla oluşturuldu.",
      data: newMeeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Meeting oluşturulurken hata oluştu.",
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

    const task = meeting.tasks.find((task) => String(task.id) === String(id));

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }

    if (title !== undefined) {
      task.title = title;
    }

    if (description !== undefined) {
      task.description = description;
    }

    if (label !== undefined) {
      task.label = label;
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    if (date !== undefined) {
      task.date = date ? new Date(date) : null;
    }

    if (startDate !== undefined) {
      task.startDate = startDate ? new Date(startDate) : null;
    }

    if (dueDate !== undefined) {
      task.dueDate = dueDate ? new Date(dueDate) : null;
    }

    if (estimatedHours !== undefined) {
      task.estimatedHours = Number(estimatedHours) || 0;
    }

    if (storyPoints !== undefined) {
      task.storyPoints = Number(storyPoints) || 0;
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
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
      (task) => String(task.id) !== String(id)
    );

    await meeting.save();
    await Notification.deleteMany({
      taskId: id,
      type: "task-assigned",
    });
    return res.status(200).json({
      success: true,
      message: "Task başarıyla silindi.",
      data: meeting,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task silinirken hata oluştu.",
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Durum bilgisi gereklidir.",
      });
    }

    const meeting = await Meeting.findOne({
      "tasks.id": id,
    });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting bulunamadı.",
      });
    }

    const task = meeting.tasks.find((task) => String(task.id) === String(id));

    if (!canChangeTask(task, req.user)) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }

    meeting.name = name;
    task.completed = name.toLowerCase() !== "todo";
    if (name.toLowerCase() === "done") {
      await Notification.deleteMany({
        taskId: id,
      });
    }

    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Meeting durumu güncellendi.",
      data: visibleMeeting(meeting, req.user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Meeting durumu güncellenemedi.",
    });
  }
};
export const updateTaskCompleted = async (req, res) => {
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

    const task = meeting.tasks.find((task) => String(task.id) === String(id));

    if (!canChangeTask(task, req.user)) {
      return res.status(404).json({
        success: false,
        message: "Task bulunamadı.",
      });
    }

    meeting.name = "done";
    task.completed = true;
    await Notification.deleteMany({
      taskId: id,
    });
    await meeting.save();

    return res.status(200).json({
      success: true,
      message: "Task tamamlandı.",
      data: visibleMeeting(meeting, req.user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Task güncellenemedi.",
    });
  }
};