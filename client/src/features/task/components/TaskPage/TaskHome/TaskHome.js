"use client";

import { taskViewStrategies } from "../../../strategies/task.strategies";
import TaskHeading from "../TaskHeading";
import TaskNavigation from "../TaskNavigation";
import dynamic from "next/dynamic";
const TaskModal = dynamic(() => import("../TaskModal"), {
  loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
});

export default function TaskHome({users,router, onToggle,onDragEnd,deletedTask,data, view, setView, open, setOpen,     isCreating,
  onSubmit, rows,handleMenuClick,openMenuId,todayTasks,isAdmin,isInitialized}) {

  const ViewComponent = taskViewStrategies[view];
  return (
    <section className="flex flex-col gap-6">
      
      <TaskHeading
        title="Görevler"
        setOpen={setOpen}
        isAdmin={isAdmin}
        isInitialized={isInitialized}
        router={router}
        description="Bugün seni neler bekliyor."
      />
      <TaskModal
                    users={users}
          open={open}

          setOpen={setOpen}
          data={data}
          isCreating={isCreating}
  
          onSubmit={onSubmit}
       


      />

      <TaskNavigation
        view={view}
        setView={setView}
        isAdmin={isAdmin}
        isInitialized={isInitialized}
      />

      <section className="min-h-[60vh]">
        <ViewComponent

          rows={rows}
          router={router}
          onToggle={onToggle}
          deletedTask={deletedTask}
          onDragEnd={onDragEnd}
          todayTasks={todayTasks}
          data={data}
          onMenuClick={handleMenuClick}

        openMenuId={openMenuId}
        />
      </section>
    </section>
  );
}
