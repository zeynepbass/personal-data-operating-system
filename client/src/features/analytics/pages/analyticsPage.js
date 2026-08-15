import { useMemo } from "react";
import AnalyticsHome from "../components/AnalyticsHome";

export default function AnalyticsPage({ meeting = [] }) {
  const tasks = useMemo(
    () => meeting.flatMap((column) => column.tasks ?? []),
    [meeting]
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed === true).length;

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

  const mostProductiveDay = useMemo(() => {
    if (!chartData.length) return null;

    return chartData.reduce((best, current) =>
      current.value > best.value ? current : best
    );
  }, [chartData]);
  const mostWorkedCategory = useMemo(() => {
    if (!tasks.length) return null;

    const categoryCounts = tasks.reduce((acc, task) => {
      const category = task.label;

      if (!category) return acc;

      acc[category] = (acc[category] || 0) + 1;

      return acc;
    }, {});

    const [category, count] = Object.entries(categoryCounts).reduce(
      (best, current) => (current[1] > best[1] ? current : best)
    );

    const percentage = Math.round((count / tasks.length) * 100);

    return {
      category,
      count,
      percentage,
    };
  }, [tasks]);
  return (
    <AnalyticsHome
      filteredData={totalTasks}
      filtered={completedTasks}
      totalEstimatedHours={totalEstimatedHours}
      chartData={chartData}
      mostProductiveDay={mostProductiveDay}
      mostWorkedCategory={mostWorkedCategory}
    />
  );
}
