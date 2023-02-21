import { Droppable } from "@hello-pangea/dnd";
import ItemsContainer from "./items-container";
import NewTask from "./new-task";

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
    <div className="m-2 w-72 rounded-lg border bg-white">
      <div className="flex items-center justify-between p-2">
        <h4 className="text-sm">{col.title}</h4>

        <NewTask col={col} />
      </div>

      <hr />

      <Droppable type="list" droppableId={col.id}>
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
