import { Draggable } from "@hello-pangea/dnd";

interface TaskItemProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

const TaskItem = ({ task, index }: TaskItemProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          className="my-1 rounded-md border bg-white py-2 px-4 text-xs"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {task.content}
        </li>
      )}
    </Draggable>
  );
};

export default TaskItem;
