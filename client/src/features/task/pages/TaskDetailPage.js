"use client";

import { useEffect, useState } from "react";

import {TaskDetailHeader} from "@/features/task/components/TaskDetail/TaskDetailHeader";
import {TaskDetaiInfo} from "@/features/task/components/TaskDetail/TaskDetaiInfo";
import {TaskDetailMeta} from "@/features/task/components/TaskDetail/TaskDetailMeta";
import NotFound  from "@/shared/pages/NotFoundPage";

export default function TaskDetail({ id }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const storedTask = localStorage.getItem("selectedTask");

    if (!storedTask) return;

    const parsedTask = JSON.parse(storedTask);

    if (parsedTask.id === id) {
      setTask(parsedTask);
    }
  }, [id]);

  if (!task) {
    return <NotFound title="opsss" description="Bu sayfa Bulunamadı" linkText="Böyle bir sayfa bulunamadı." buttonText="Tasklere dön" route="/tasks"/>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div >
        <TaskDetailHeader task={task} />

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                  Task
                </span>

                <h2 className="text-xl font-semibold text-gray-900">
                  {task.title}  
                </h2>

                {task.description && (
                  <p className="mt-2 max-w-3xl text-sm leading-6  text-gray-500">
                    {task.description}
                  </p>
                )}
              </div>



 
 
            </div>
          </div>

          <TaskDetaiInfo task={task} />

          <TaskDetailMeta task={task} />
        </div>
      </div>
    </div>
  );
}