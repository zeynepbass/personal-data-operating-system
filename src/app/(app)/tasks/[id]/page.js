import TaskDetail from "@/features/task/pages/TaskDetailPage";
import { requirePageUser } from "@/server/auth/dal";
import { orNotFound } from "@/server/page";
import { getTask } from "@/server/services/task.service";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const task = await orNotFound(getTask(await requirePageUser(), id));
  return { title: task.title };
}

export default async function TaskDetailRoute({ params }) {
  const { id } = await params;
  const user = await requirePageUser();
  const task = await orNotFound(getTask(user, id));

  return <TaskDetail task={task} canEdit={user.role === "admin"} />;
}
