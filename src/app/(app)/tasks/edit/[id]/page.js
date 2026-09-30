import { notFound } from "next/navigation";

import TaskEditPage from "@/features/task/pages/TaskEditPage";
import { requirePageUser } from "@/server/auth/dal";
import { orNotFound } from "@/server/page";
import { getTask } from "@/server/services/task.service";

export const metadata = { title: "Görevi Düzenle" };

export default async function TaskEditRoute({ params }) {
  const { id } = await params;
  const user = await requirePageUser();
  if (user.role !== "admin") notFound();

  const task = await orNotFound(getTask(user, id));

  return <TaskEditPage task={task} />;
}
