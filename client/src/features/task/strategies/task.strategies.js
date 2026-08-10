import TaskView from "../components/TaskView";
import TasKanban from  "../components/TasKanban";
import TaskList from "../components/TaskList";

export const taskViewStrategies = {
  list: TaskList,
  table: TaskView,
  kanban: TasKanban,
};