import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { ProjectProps } from "../../typings/project";
import useProject from "../stores/useProject";
import GroupColumn from "./projects/column";

const DashboardContainer = () => {
  const [state, setState] = useProject((state) => [
    state.stateProject,
    state.updateStateProject,
  ]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!state) return;

    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) return;

      // same group drag
      const column = state.columns[source.droppableId];
      const newTaskIds = Array.from(column.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);

      return;
    }

    // drag from different group
    const sourceGroup = state.columns[source.droppableId];
    const destinationGroup = state.columns[destination.droppableId];

    const newSourceTasks = sourceGroup.taskIds.filter((t) => t !== draggableId);
    destinationGroup.taskIds.splice(destination.index, 0, draggableId);

    const newState: ProjectProps = {
      ...state,
      columns: {
        ...state.columns,
        [source.droppableId]: {
          ...sourceGroup,
          taskIds: newSourceTasks,
        },
        [destination.droppableId]: {
          ...destinationGroup,
        },
      },
    };

    setState(newState);
  };

  if (!state) {
    return <></>;
  }

  return (
    <div className="z-30 w-full overflow-auto px-4 pt-16">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex w-full flex-col items-stretch lg:flex-row lg:items-start">
          {state.columnOrder.map((col, index) => (
            <GroupColumn
              col={state.columns[col]}
              tasks={state.columns[col].taskIds.map((id) => state.tasks[id])}
              key={index}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DashboardContainer;
