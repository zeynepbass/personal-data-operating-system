"use client";

import { taskViewStrategies } from "../../strategies/task.strategies";
import { useMemo } from "react";
import TaskHeading from "../TaskHeading";
import TaskNavigation from "../TaskNavigation";
import dynamic from "next/dynamic";
const TaskModal = dynamic(() => import("../TaskModal"), {
  loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
});

export default function TaskHome({ data, view, setView, open, setOpen, rows,handleMenuClick,openMenuId,todayTasks}) {

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
        // form={form}
        // handleChange={handleChange}
        // onSubmit={onSubmit}
        // onClose={onClose}
      />

      <TaskNavigation
        view={view}
        setView={setView}
        data={data}
   openMenuId={openMenuId}
      />

      <section className="min-h-[60vh]">
        <ViewComponent
          rows={rows}
          todayTasks={todayTasks}
          data={data}
          onMenuClick={handleMenuClick}

        openMenuId={openMenuId}
        />
        {/* {view === "list" && (
          <TaskList
            tasks={todayTasks}
            onToggle={handleToggle}
            onMenuClick={handleMenuClick}
            openMenuId={openMenuId}
          />
        )}
        {view === "kanban" && (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.data.map((column) => (
                <TaskColumn key={column.id} column={column} />
              ))}
            </div>
          </DragDropContext>
        )}

        {view === "table" && (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <TaskView
              rows={rows}
              onMenuClick={handleMenuClick}
              openMenuId={openMenuId}
            />
          </div>
        )} */}
      </section>
    </section>
  );
}
