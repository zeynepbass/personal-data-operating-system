import { DragDropContext } from "@hello-pangea/dnd";
import TaskColumn from "@/shared/components/organisms/Column";

export default function TaskKanban({
  data,
  onDragEnd,
}) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {data.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
          />
        ))}
      </div>
    </DragDropContext>
  );
}