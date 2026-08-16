"use client";

import { taskViewStrategies } from "../../../strategies/task.strategies";
import TaskHeading from "../TaskHeading";
import TaskNavigation from "../TaskNavigation";
import dynamic from "next/dynamic";
const TaskModal = dynamic(() => import("../TaskModal"), {
  loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
});

export default function TaskHome({router, onToggle,onDragEnd,deletedTask,data, view, setView, open, setOpen,     isCreating,
  onSubmit, rows,handleMenuClick,openMenuId,todayTasks}) {

  const ViewComponent = taskViewStrategies[view];
  return (
    <section className="flex flex-col gap-6">
      
      <TaskHeading
        title="Görevler"
        setOpen={setOpen}
        description="Bugün seni neler bekliyor."
      />
      <TaskModal
          open={open}
          setOpen={setOpen}
          data={data}
          isCreating={isCreating}
  
          onSubmit={onSubmit}
       


      />

      <TaskNavigation
        view={view}
        setView={setView}

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
