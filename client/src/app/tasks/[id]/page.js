"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

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
    return <div>Task bulunamadı.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {task.title}
      </h1>

      <p className="mt-2 text-gray-500">
        {task.description}
      </p>

      <div className="mt-4">
        Durum: {task.status}
      </div>
    </div>
  );
}