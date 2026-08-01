"use client";


import { DragDropContext } from "@hello-pangea/dnd";
import {
  TaskList,
  TaskView,
   TaskColumn,
  TaskModal,
} from "./routes/task.dynamic";
import { useMemo } from "react";
import TaskHeading from "../TaskHeading";
import TaskNavigation from "../TaskNavigation"
export default function TaskHome ({
  view,
  setView,
  data,
  rows,
  form,
  open,
  setOpen,
  handleChange,
  onSubmit,
  onClose,
  onDragEnd,
  openMenuId,
  handleToggle,
  handleMenuClick,
})  {
  const todayTasks = useMemo(() => {
    return rows.filter((task) => task.columnId === "todo");
  }, [rows]);
  console.log(rows)
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
        form={form}
        handleChange={handleChange}
        onSubmit={onSubmit}
        onClose={onClose}
      />


      <TaskNavigation
        view={view}
        setView={setView}
        data={data}
        openMenuId={openMenuId}
      />


      <section className="min-h-[60vh]">
        {view === "list" && (
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
              {data.map((column) => (
                <TaskColumn
                  key={column.id}
                  column={column}
                />
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
        )}
      </section>
    </section>
  );
};