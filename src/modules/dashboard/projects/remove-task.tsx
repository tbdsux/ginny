import { XMarkIcon } from "@heroicons/react/24/solid";
import useProject from "../../stores/useProject";

interface RemoveTaskProps {
  colId: string;
  taskId: string;
}

const RemoveTask = ({ taskId, colId }: RemoveTaskProps) => {
  const [state, setState] = useProject((s) => [
    s.stateProject,
    s.updateStateProject,
  ]);

  const removeTask = () => {
    if (!state) return;
    if (taskId === "") return;

    const newTasks = Object.entries(state.tasks).filter(
      ([key, _]) => key !== taskId
    );

    const newColTaskIds = Array.from(state.columns[colId].taskIds).filter(
      (k) => k !== taskId
    );

    setState({
      ...state,
      columns: {
        ...state.columns,
        [colId]: {
          ...state.columns[colId],
          taskIds: newColTaskIds,
        },
      },
      tasks: Object.fromEntries(newTasks),
    });
  };

  return (
    <button
      onClick={removeTask}
      title="Remove Task"
      className="absolute top-1 right-1 hidden duration-300 hover:text-red-500 group-hover:block"
    >
      <XMarkIcon className="h-4 w-4" />
    </button>
  );
};

export default RemoveTask;
