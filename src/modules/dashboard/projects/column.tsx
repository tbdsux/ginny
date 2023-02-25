import { Droppable } from "@hello-pangea/dnd";
import TaskItem from "./item";
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
    <div className="my-2 mx-0 w-full rounded-lg border lg:mx-2 lg:w-72">
      <div className="flex items-center justify-between rounded-t-lg bg-white p-2">
        <h4 className="text-sm">{col.title}</h4>

        <NewTask col={col} />
      </div>

      <hr />

      <Droppable type="list" droppableId={col.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`rounded-b-lg py-2 px-3 ${
              snapshot.isDraggingOver ? "bg-stone-200" : "bg-stone-100"
            }`}
          >
            {tasks.map((task, index) => (
              <TaskItem task={task} index={index} key={task.id} />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default GroupColumn;
