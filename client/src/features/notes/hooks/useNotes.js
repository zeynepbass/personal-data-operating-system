
"use client";

import { useState } from "react";
import columns from "../../../shared/mocks/data.json";

export default function useNotes  () {
  const [view, setView] = useState("list");


  const [data, setData] = useState(columns);

  const [open, setOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    label: "",
    assignee: "",

    priority: "Medium",
    status: "Todo",

    startDate: "",
    dueDate: "",
    estimatedHours: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const onClose = () => {
    setOpen(false);
  };


  const onSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: `task-${Date.now()}`,
      title: form.title,
      description: form.description,
      label: form.label,
      priority: form.priority,

      date: new Date().toISOString().split("T")[0],

      startDate: form.startDate,
      dueDate: form.dueDate,

      estimatedHours: Number(form.estimatedHours) || 0,
      spentHours: 0,

      progress: 0,
      storyPoints: 0,

      completed: false,

      assignee: {
        id: "new-user",
        fullName: form.assignee || "Unassigned",
        role: "Frontend Developer",
        avatar: "",
        status: "online",
      },
    };

    setData((prev) =>
      prev.map((column) => {
        if (column.title === form.status) {
          return {
            ...column,
            tasks: [
              ...column.tasks,
              newTask,
            ],
          };
        }

        return column;
      })
    );

    setForm({
      title: "",
      description: "",
      label: "",
      assignee: "",
      priority: "Medium",
      status: "Todo",
      startDate: "",
      dueDate: "",
      estimatedHours: "",
    });

    setOpen(false);
  };



  const handleToggle = (taskId) => {
    setData((prev) => {
      if (!Array.isArray(prev)) {
        return [];
      }
  
      return prev.map((column) => {
        const tasks = Array.isArray(column?.tasks)
          ? column.tasks
          : [];
  
        return {
          ...column,
          tasks: tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  completed: !task.completed,
                }
              : task
          ),
        };
      });
    });
  };

  const handleMenuClick = (taskId) => {
    setOpenMenuId((prev) =>
      prev === taskId ? null : taskId
    );
  };


  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    setData((prev) => {
      const sourceColumn = prev.find(
        (column) =>
          column.id === source.droppableId
      );

      const destinationColumn = prev.find(
        (column) =>
          column.id === destination.droppableId
      );

      if (!sourceColumn || !destinationColumn) {
        return prev;
      }
      if (
        source.droppableId ===
        destination.droppableId
      ) {
        const tasks = [
          ...sourceColumn.tasks,
        ];

        const [movedTask] = tasks.splice(
          source.index,
          1
        );

        tasks.splice(
          destination.index,
          0,
          movedTask
        );

        return prev.map((column) =>
          column.id === sourceColumn.id
            ? {
                ...column,
                tasks,
              }
            : column
        );
      }


      const sourceTasks = [
        ...sourceColumn.tasks,
      ];

      const destinationTasks = [
        ...destinationColumn.tasks,
      ];

      const [movedTask] = sourceTasks.splice(
        source.index,
        1
      );

      destinationTasks.splice(
        destination.index,
        0,
        movedTask
      );

      return prev.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            tasks: sourceTasks,
          };
        }

        if (
          column.id === destinationColumn.id
        ) {
          return {
            ...column,
            tasks: destinationTasks,
          };
        }

        return column;
      });
    });
  };


  return {
    view,
    setView,

    data,
    setData,

    rows,

    form,
    setForm,
    handleChange,

    open,
    setOpen,
    onClose,
    onSubmit,

    openMenuId,
    handleToggle,
    handleMenuClick,

    onDragEnd,
  };
};
