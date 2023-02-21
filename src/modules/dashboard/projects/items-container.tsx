import { DroppableProvided } from "@hello-pangea/dnd";
import TaskItem from "./item";

interface ItemsContainerProps {
  provided: DroppableProvided;
  tasks: { id: string; content: string }[];
}

const ItemsContainer = ({ provided, tasks }: ItemsContainerProps) => {
  return (
    <ul ref={provided.innerRef} className="py-2 px-3">
      {tasks.map((task, index) => (
        <TaskItem task={task} index={index} key={task.id} />
      ))}

      {provided.placeholder}
    </ul>
  );
};

export default ItemsContainer;
