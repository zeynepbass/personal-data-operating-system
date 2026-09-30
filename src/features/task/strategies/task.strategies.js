import TasKanban from "../components/TaskPage/TasKanban";
import TaskList from "../components/TaskPage/TaskList";
import TaskView from "../components/TaskPage/TaskView";

export const taskViewStrategies = {
  list: TaskList,
  table: TaskView,
  kanban: TasKanban,
};
