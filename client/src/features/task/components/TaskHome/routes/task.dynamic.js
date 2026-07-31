
import dynamic from "next/dynamic";
export const TaskList = dynamic(
  () => import("../components/TaskList").then((mod) => mod.ListView),
  {
    loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
  }
);

export const TaskView = dynamic(
  () => import("../components/TaskView").then((mod) => mod.TableView),
  {
    loading: () => <div className="py-10 text-center">Yükleniyor...</div>,
  }
);

export const TaskColumn = dynamic(
  () => import("../components/TaskColumn").then((mod) => mod.Column),
  {
    loading: () => <div className="py-10 text-center">Kanban yükleniyor...</div>,
  }
);

export const TaskModal = dynamic(
  () => import("../components/TaskModal").then((mod) => mod.Modal)
);
