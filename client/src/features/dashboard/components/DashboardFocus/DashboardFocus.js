"use client";

import { useMemo } from "react";
import { useTasks } from "@/features/task/hooks/useTask";

export default function DashboardFocus({ duration }) {
  const { data, isLoading } = useTasks();

    const tasks = useMemo(() => {
      if (!Array.isArray(data)) return [];
    
      return data.flatMap((group) => {
        if (!Array.isArray(group.tasks)) return [];
    
        return group.tasks.map((task) => ({
          ...task,
          status: group.name,
        }));
      });
    }, [data]);
    const filteredTasks = useMemo(() => {
      const today = new Date();
    
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth();
      const currentDay = today.getDate();
    

    
      return tasks.filter((task) => {

    
        if (!task.date) {

          return false;
        }
    
        const taskDate = new Date(task.date);

        if (duration === "year") {
          const taskYear = taskDate.getUTCFullYear();

          return taskYear === currentYear;
        }
    
        if (duration === "month") {
          return (
            taskDate.getFullYear() === currentYear &&
            taskDate.getMonth() === currentMonth
          );
        }
    
        if (duration === "day") {
          return (
            taskDate.getFullYear() === currentYear &&
            taskDate.getMonth() === currentMonth &&
            taskDate.getDate() === currentDay
          );
        }
    
        return false;
      });
    }, [tasks, duration]);

  const statistics = useMemo(() => {
    const total = filteredTasks.length;

    const todo = filteredTasks.filter(
      (task) => task.status === "todo"
    ).length;

    const inProgress = filteredTasks.filter(
      (task) => task.status === "in-progress"
    ).length;

    const done = filteredTasks.filter(
      (task) => task.status === "done"
    ).length;

    return {
      total,
      todo,
      inProgress,
      done,
      pending: todo + inProgress,
    };
  }, [filteredTasks]);

  const activityData = useMemo(() => {
    const today = new Date();
  

    if (duration === "day") {
      const hours = [];
  
      for (let i = 0; i < 24; i++) {
        let count = 0;
  
        tasks.forEach((task) => {
          if (!task.date) return;
  
          const taskDate = new Date(task.date);
  
          const sameHour =
            taskDate.getFullYear() === today.getFullYear() &&
            taskDate.getMonth() === today.getMonth() &&
            taskDate.getDate() === today.getDate() &&
            taskDate.getHours() === i;
  
          if (sameHour) {
            count++;
          }
        });
  
        hours.push({
          label: `${String(i).padStart(2, "0")}:00`,
          count,
        });
      }
  
      return hours;
    }
  

    if (duration === "month") {
      const year = today.getFullYear();
      const month = today.getMonth();
  
      const daysInMonth = new Date(
        year,
        month + 1,
        0
      ).getDate();
  
      const days = [];
  
      for (let i = 1; i <= daysInMonth; i++) {
        let count = 0;
  
        tasks.forEach((task) => {
          if (!task.date) return;
  
          const taskDate = new Date(task.date);
  
          const sameDay =
            taskDate.getFullYear() === year &&
            taskDate.getMonth() === month &&
            taskDate.getDate() === i;
  
          if (sameDay) {
            count++;
          }
        });
  
        days.push({
          label: String(i),
          count,
        });
      }
  
      return days;
    }
  

    if (duration === "year") {
      const year = today.getFullYear();
  
      const months = [];
  
      for (let i = 0; i < 12; i++) {
        let count = 0;
  
        tasks.forEach((task) => {
          if (!task.date) return;
  
          const taskDate = new Date(task.date);
  
          const sameMonth =
            taskDate.getFullYear() === year &&
            taskDate.getMonth() === i;
  
          if (sameMonth) {
            count++;
          }
        });
  
        months.push({
          label: new Date(year, i, 1).toLocaleDateString(
            "tr-TR",
            {
              month: "short",
            }
          ),
          count,
        });
      }
  
      return months;
    }
  
    return [];
  }, [tasks, duration]);
  const maxActivity = Math.max(
    ...activityData.map((item) => item.count),
    1
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>

      <div className="grid grid-cols-3 gap-3">


        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-center">
          <p className="text-2xl font-bold text-[#555A8A]">
            {statistics.total}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Toplam Görev
          </p>
        </div>


        <div className="rounded-xl border border-green-100 bg-green-50 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">
            {statistics.done}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Tamamlanan
          </p>
        </div>


        <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">
            {statistics.pending}
          </p>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Tamamlanmayı Bekleyen
          </p>
        </div>
      </div>


      <div className="mt-4 grid grid-cols-3 gap-3">


        <div className="rounded-xl border border-green-500 bg-white p-3 text-center">
          <p className="text-lg font-bold text-green-500">
            {statistics.todo}
          </p>

          <p className="text-xs text-green-500">
            Todo
          </p>
        </div>


        <div className="rounded-xl border border-blue-500 bg-white p-3 text-center">
          <p className="text-lg font-bold text-blue-500">
            {statistics.inProgress}
          </p>

          <p className="text-xs text-blue-500">
            In Progress
          </p>
        </div>


        <div className="rounded-xl border border-orange-500 bg-white p-3 text-center">
          
          <p className="text-lg font-bold text-orange-500">
            {statistics.done}
          </p>

          <p className="text-xs text-orange-500">
            Done
          </p>
        </div>
      </div>


      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-700">
            Haftalık Aktivite
          </p>

          <span className="text-xs text-slate-400">
            Son 7 gün
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="flex min-w-105 items-end justify-between gap-5 px-2 pt-4">

            {activityData.map((item,index) => {
              const height =
                item.count === 0
                  ? 8
                  : Math.max(
                      (item.count / maxActivity) * 100,
                      15
                    );

              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs font-medium text-purple-300">
                    {item.count}
                  </span>

                  <div
                    className="w-7 rounded-t-lg bg-purple-300 transition-all hover:opacity-80"
                    style={{
                      height: `${height}px`,
                    }}
                  />

                  <span className="text-xs font-medium text-slate-400">
                    {item.day}
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </>
  );
}