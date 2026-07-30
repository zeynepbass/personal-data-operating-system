"use client";
import { useMemo, useState } from "react";
import columns from "@/shared/mocks/event.json";
export const useBoard = () => {
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

    type: "pdf",
    size: "",
    date: "",
    icon: "pdf",
    color: "red",
    favorite: false,
    shared: false,
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

    onSubmit(form);

    setForm({
      title: "",
      description: "",
      label: "",
      priority: "Medium",
      status: "Todo",
      assignee: "",
      startDate: "",
      dueDate: "",
      estimatedHours: "",
    });

    onClose();
  };
  const rows = useMemo(() => {
    return data.flatMap((column) =>
      column.tasks?.map((task) => ({
        ...task,
        status: column.title,
        statusColor: column.color,
        columnId: column.id,
      }))
    );
  }, [data]);

  const handleToggle = (taskId) => {
    setData((prev) =>
      prev.map((column) => ({
        ...column,
        tasks: column.tasks?.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }))
    );
  };

  const handleMenuClick = (taskId) => {
    setOpenMenuId((prev) => (prev === taskId ? null : taskId));
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    const sourceColumn = columns.find(
      (column) => column.id === source.droppableId
    );

    const destinationColumn = columns.find(
      (column) => column.id === destination.droppableId
    );

    const sourceTasks = [...sourceColumn.tasks];

    const destinationTasks =
      source.droppableId === destination.droppableId
        ? sourceTasks
        : [...destinationColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);

    destinationTasks.splice(destination.index, 0, removed);

    setData(
      columns.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            tasks: sourceTasks,
          };
        }

        if (column.id === destinationColumn.id) {
          return {
            ...column,
            tasks: destinationTasks,
          };
        }

        return column;
      })
    );
  };
  return {
    view,
    onSubmit,
    onClose,
    onDragEnd,
    setView,
    data,
    form,
    setData,
    rows,
    handleChange,
    open,
    setOpen,
    openMenuId,
    handleToggle,
    handleMenuClick,
  };
};
