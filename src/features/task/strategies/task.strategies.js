import dynamic from "next/dynamic";

import TaskList from "../components/TaskPage/TaskList";
import TaskView from "../components/TaskPage/TaskView";

const ViewLoading = () => (
  <p role="status" className="py-10 text-center text-sm text-gray-500">
    Görünüm yükleniyor…
  </p>
);

const TasKanban = dynamic(() => import("../components/TaskPage/TasKanban"), {
  ssr: false,
  loading: ViewLoading,
});

export const taskViewStrategies = {
  list: TaskList,
  table: TaskView,
  kanban: TasKanban,
};
