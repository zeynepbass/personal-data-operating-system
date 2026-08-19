"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import AnalyticsHome from "../components/AnalyticsHome";
import { getRemainingMonthDates } from "../utils/date";
import { useTasks } from "@/features/task/hooks/useTask";

export default function AnalyticsPage() {
  const router = useRouter();
  const { data: meeting = [], isLoading, error } = useTasks();

  useEffect(() => {
    if (error?.response?.status === 401) {
      window.localStorage.removeItem("pdos_token");
      window.localStorage.removeItem("pdos_user");
      router.replace("/login");
    }
  }, [error, router]);

  const tasks = useMemo(() => {
    return meeting.flatMap((column) => column.tasks ?? []);
  }, [meeting]);

  const options = useMemo(() => {
    return getRemainingMonthDates();
  }, []);

  const [selectedRange, setSelectedRange] = useState(
    options[0]?.value ?? ""
  );


  const filteredTasks = useMemo(() => {
    if (!selectedRange) return tasks;

    const [startDate, endDate] = selectedRange.split("_");

    return tasks.filter((task) => {
      if (!task.date) return false;

      const taskDate = String(task.date).slice(0, 10);

      return taskDate >= startDate && taskDate <= endDate;
    });
  }, [tasks, selectedRange]);


  const totalTasks = filteredTasks.length;


  const completedTasks = filteredTasks.filter(
    (task) => task.completed === true
  ).length;


  const totalEstimatedHours = filteredTasks.reduce(
    (total, task) =>
      total + (Number(task.estimatedHours) || 0),
    0
  );


  const chartData = useMemo(() => {
    const days = [
      "Pzt",
      "Sal",
      "Çar",
      "Per",
      "Cum",
      "Cmt",
      "Paz",
    ];

    const result = days.map((day) => ({
      day,
      value: 0,
    }));

    filteredTasks.forEach((task) => {
      if (!task.date) return;

      const date = new Date(task.date);
      const dayIndex = (date.getDay() + 6) % 7;

      result[dayIndex].value += 1;
    });

    return result;
  }, [filteredTasks]);


  const mostProductiveDay = useMemo(() => {
    if (!chartData.length) return null;

    return chartData.reduce((best, current) =>
      current.value > best.value ? current : best
    );
  }, [chartData]);

  const mostWorkedCategory = useMemo(() => {
    if (!filteredTasks.length) return null;
  
    const categoryCounts = filteredTasks.reduce((acc, task) => {
      const label = task.label?.trim();
  
      if (!label) return acc;
  
      acc[label] = (acc[label] || 0) + 1;
  
      return acc;
    }, {});
  
    const [category, count] =
      Object.entries(categoryCounts).reduce(
        (best, current) =>
          current[1] > best[1] ? current : best
      );
  
    return {
      category,
      count,
      percentage: Math.round(
        (count / filteredTasks.length) * 100
      ),
    };
  }, [filteredTasks]);

  if (isLoading) {
    return <p className="p-6 text-sm text-gray-500">Yükleniyor...</p>;
  }

  if (error) {
    if (error.response?.status === 401) {
      return <p className="p-6 text-sm text-gray-500">Giriş sayfasına yönlendiriliyorsunuz...</p>;
    }
    return <p className="p-6 text-sm text-red-600">Veriler yüklenemedi: {error.message}</p>;
  }

  return (
    <AnalyticsHome
      filteredData={filteredTasks}
      totalTasks={totalTasks}
      completedTasks={completedTasks}
      totalEstimatedHours={totalEstimatedHours}
      selectedRange={selectedRange}
      setSelectedRange={setSelectedRange}
      options={options}
      chartData={chartData}
      mostWorkedCategory={mostWorkedCategory}
      mostProductiveDay={mostProductiveDay}
    />
  );
}
