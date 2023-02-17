import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import { useState } from "react";
import useMounted from "../../hooks/useMounted";
import GroupColumn from "./projects/column";
import ProjectTitleBar from "./title-bar";

const initialData: {
  tasks: Record<string, { id: string; content: string }>;
  columns: Record<string, { id: string; title: string; taskIds: string[] }>;
  columnOrder: string[];
} = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "col-1": {
      id: "col-1",
      title: "Group 1",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "col-2": {
      id: "col-2",
      title: "Group 2",
      taskIds: ["task-4"],
    },
  },
  columnOrder: ["col-1", "col-2"],
};

const DashboardPage = () => {
  const mounted = useMounted();

  const [state, setState] = useState(initialData);

  const getTasks = (col: string) => {
    return state.columns[col].taskIds.map((id) => state.tasks[id]);
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId
      // destination.index === source.index
    ) {
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

    const newState: typeof initialData = {
      ...state,
      columns: {
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

  return (
    <div>
      <ProjectTitleBar />

      {mounted ? (
        <div className="px-4">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex w-full items-start overflow-auto">
              {state.columnOrder.map((col, index) => (
                <GroupColumn
                  col={state.columns[col]}
                  tasks={getTasks(col)}
                  key={index}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DashboardPage;
