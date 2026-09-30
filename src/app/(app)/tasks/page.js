import TaskPage from "@/features/task/pages/TaskPage";
import { requirePageUser } from "@/server/auth/dal";
import { listAssignableUsers, listBoard } from "@/server/services/task.service";

export const metadata = { title: "Görevler" };

export default async function Tasks() {
  const user = await requirePageUser();
  const [board, users] = await Promise.all([
    listBoard(user),
    user.role === "admin" ? listAssignableUsers(user) : [],
  ]);

  return <TaskPage initialBoard={board} users={users} />;
}
