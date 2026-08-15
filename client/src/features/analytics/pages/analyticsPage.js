import { useMemo } from "react";
import AnalyticsHome from "../components/AnalyticsHome";

export default function AnalyticsPage({ meeting = [] }) {
  const tasks = useMemo(
    () => meeting.flatMap((column) => column.tasks ?? []),
    [meeting]
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed === true
  ).length;

  const totalEstimatedHours = tasks.reduce(
    (total, task) => total + (Number(task.estimatedHours) || 0),
    0
  );

  const chartData = useMemo(() => {
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

    const result = days.map((day) => ({
      day,
      value: 0,
    }));

    tasks.forEach((task) => {
      if (!task.date) return;

      const date = new Date(task.date);
      const dayIndex = (date.getDay() + 6) % 7;

      result[dayIndex].value += 1;
    });

    return result;
  }, [tasks]);

  return (
    <AnalyticsHome
      filteredData={totalTasks}
      filtered={completedTasks}
      totalEstimatedHours={totalEstimatedHours}
      chartData={chartData}
    />
  );
}