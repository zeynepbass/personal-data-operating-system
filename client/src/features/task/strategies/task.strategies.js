import TaskView from "../components/TaskPage/TaskView";
import TasKanban from  "../components/TaskPage/TasKanban";
import TaskList from "../components/TaskPage/TaskList";

export const taskViewStrategies = {
  list: TaskList,
  table: TaskView,
  kanban: TasKanban,
};