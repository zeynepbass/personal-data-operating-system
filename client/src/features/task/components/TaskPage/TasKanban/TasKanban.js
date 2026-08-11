import { DragDropContext } from "@hello-pangea/dnd";
import {Column} from "@/shared/components/organisms";
import { groupTasksByStatus } from "../../../utils/colums.filter";

export default function TaskKanban({
  data,
  onDragEnd,
}) {
  const columns = groupTasksByStatus(data);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
          />
        ))}
      </div>
    </DragDropContext>
  );
}