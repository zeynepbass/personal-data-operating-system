"use client";

import { useParams } from "next/navigation";
import TaskDetail from "@/features/task/pages/TaskDetailPage";

export default function Page() {
  const { id } = useParams();

  return <TaskDetail id={id} />;
}