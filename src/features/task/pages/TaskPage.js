"use client";

import { useMemo } from "react";

import { useCurrentUser } from "@/features/auth/context/AuthProvider";

import TaskHome from "../components/TaskPage/TaskHome";
import { useTasks } from "../hooks/useTask";
import { transformTasksToRows, getTodayTasks } from "../utils/colums.filter";

export default function TaskPage({ initialBoard, users = [] }) {
  const user = useCurrentUser();
  const isAdmin = user?.role === "admin";
  const {
    data,
    deletedTask,
    isLoading,
    isError,
    openMenuId,
    setOpenMenuId,
    router,
    handleDragEnd,
    error,

    createTask,
    view,
    setView,
    open,
    setOpen,
    onToggle,
  } = useTasks({ initialData: initialBoard });

  const handleMenuClick = (taskId) => {
    setOpenMenuId((prev) => (prev === taskId ? null : taskId));
  };

  const rows = useMemo(() => transformTasksToRows(data ?? []), [data]);

  const todayTasks = useMemo(() => getTodayTasks(data, user?.id), [data, user?.id]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (isError) {
    return <div>Bir hata oluştu: {error.message}</div>;
  }

  return (
    <TaskHome
      rows={rows ?? []}

      todayTasks={todayTasks ?? []}
      view={view}
      router={router}
      onToggle={onToggle}
      users={users ?? []}
      deletedTask={deletedTask}
      isCreating={createTask.isPending}
      onSubmit={createTask}
      handleMenuClick={handleMenuClick}
      openMenuId={openMenuId}
      open={open}
      isAdmin={isAdmin}
      onDragEnd={handleDragEnd}
      setOpen={setOpen}
      setView={setView}
      data={data ?? []}
    />
  );
}
