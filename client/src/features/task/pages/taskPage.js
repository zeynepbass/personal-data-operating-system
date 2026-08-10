"use client";

import TaskHome from "../components/TaskHome";
import { useMemo } from "react";
import { useTasks } from "../hooks/useTask";
import {
  transformTasksToRows,
  getTodayTasks,
} from "../utils/colums.filter";

export default function TaskPage() {
  const {
    data,
    isLoading,
    isError,
    openMenuId,
    setOpenMenuId,
    error,
    view,
    setView,
    open,
    setOpen,
  } = useTasks();

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
      rows={rows}
      todayTasks={todayTasks}
      view={view}
      handleMenuClick={handleMenuClick}
      openMenuId={openMenuId}
      open={open}
      setOpen={setOpen}
      setView={setView}
      data={data}
    />
  );
}