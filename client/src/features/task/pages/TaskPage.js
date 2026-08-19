"use client";

import TaskHome from "../components/TaskPage/TaskHome";
import { useMemo } from "react";
import { useTasks } from "../hooks/useTask";
import {useAuth} from "@/features/auth/hooks/useAuth"
import {
  transformTasksToRows,
  getTodayTasks,
} from "../utils/colums.filter";
import { useRouter } from "next/navigation";
export default function TaskPage() {
  const {user,isInitialized} = useAuth();  
  const isAdmin = user?.role === "admin";
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
    onToggle,
    users
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
      isInitialized={isInitialized}
      router={router}
      onToggle={onToggle}
      users={users ?? []}
      deletedTask={deletedTask}
      isCreating={isCreating}
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