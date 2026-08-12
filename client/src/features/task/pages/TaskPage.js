"use client";

import TaskHome from "../components/TaskPage/TaskHome";
import { useMemo } from "react";
import { useTasks } from "../hooks/useTask";
import {
  transformTasksToRows,
  getTodayTasks,
} from "../utils/colums.filter";
import { useRouter } from "next/navigation";
export default function TaskPage() {
  const {
    data,
    deletedTask,
    isLoading,
    isError,
    openMenuId,
    setOpenMenuId,
    
    handleDragEnd,
    error,
    isCreating,
    createTask,
    view,
    setView,
    open,
    setOpen,
    onToggle
  } = useTasks();
  const router = useRouter();
  const handleMenuClick = (taskId) => {
    setOpenMenuId((prev) =>
      prev === taskId ? null : taskId
    );
  };

  const rows = useMemo(
    () => transformTasksToRows(data ?? []),
    [data]
  );

  const todayTasks = useMemo(
    () => getTodayTasks(data),
    [data]
  );

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (isError) {
    return (
      <div>
        Bir hata oluştu: {error.message}
      </div>
    );
  }

  return (
    <TaskHome
      rows={rows ?? []}
      todayTasks={todayTasks ?? []}
      view={view}
      router={router}
      onToggle={onToggle}
      deletedTask={deletedTask}
      isCreating={isCreating}
      onSubmit={createTask}
      handleMenuClick={handleMenuClick}
      openMenuId={openMenuId}
      open={open}
      onDragEnd={handleDragEnd}
      setOpen={setOpen}
      setView={setView}
      data={data ?? []}
    />
  );
}