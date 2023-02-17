import { Droppable } from "@hello-pangea/dnd";
import ItemsContainer from "./items-container";

interface GroupColumnProps {
  col: {
    id: string;
    title: string;
    taskIds: string[];
  };
  tasks: {
    id: string;
    content: string;
  }[];
}

const GroupColumn = ({ col, tasks }: GroupColumnProps) => {
  return (
    <div className="m-2 w-72 rounded-lg border p-4 ">
      <h4 className="text-sm">{col.title}</h4>

      <Droppable droppableId={col.id}>
        {(provided) => (
          <ItemsContainer
            {...provided.droppableProps}
            provided={provided}
            tasks={tasks}
          />
        )}
      </Droppable>
    </div>
  );
};

export default GroupColumn;
