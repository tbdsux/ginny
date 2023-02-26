import { Draggable } from "@hello-pangea/dnd";
import useOpen from "../../../hooks/useOpen";
import RemoveTask from "./remove-task";
import UpdateTask from "./update-task";

interface TaskItemProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
  colId: string;
}

const TaskItem = ({ task, index, colId }: TaskItemProps) => {
  const { isOpen, close, open } = useOpen();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <>
          <div
            onClick={open}
            title="Update task"
            className="group relative my-1 cursor-text rounded-md border bg-white py-2 px-4 text-xs"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {task.content}

            <RemoveTask colId={colId} taskId={task.id} />
          </div>

          <UpdateTask
            isOpen={isOpen}
            closeModal={close}
            defTaskId={task.id}
            defValue={task.content}
          />
        </>
      )}
    </Draggable>
  );
};

export default TaskItem;
