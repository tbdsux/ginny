import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useProject from "../../../stores/useProject";

const OrganizeGroupTasks = () => {
  const [portal, setPortal] = useState<HTMLDivElement>();

  const [state, setState] = useProject((s) => [
    s.stateProject,
    s.updateStateProject,
  ]);

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!state) return;

    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newOrder = Array.from(state.columnOrder);

    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);

    setState({
      ...state,
      columnOrder: newOrder,
    });
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      const _portal = document.createElement("div");
      document.body.appendChild(_portal);

      setPortal(_portal);
    }
  }, []);

  if (!state) {
    return <></>;
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h3 className="text-sm font-bold uppercase leading-loose text-gray-700 underline">
          Organize Group Tasks
        </h3>
        <p className="text-sm text-gray-600">
          Drag-and-drop to re-arange your task groups.
        </p>
        <div className="mt-4 w-full">
          <Droppable direction="vertical" droppableId={state.key}>
            {(provided) => (
              <ul
                className="flex flex-col rounded-lg border bg-gray-50 p-4"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.columnOrder.map((c, index) => (
                  <Draggable key={c} draggableId={c} index={index}>
                    {(dragProvided, snapshot) => {
                      const item = (
                        <li
                          className="my-1 inline-flex items-center rounded-lg border bg-gray-100 py-2 px-4 text-sm"
                          ref={dragProvided.innerRef}
                          {...dragProvided.dragHandleProps}
                          {...dragProvided.draggableProps}
                        >
                          <ArrowsPointingOutIcon
                            aria-hidden="true"
                            className="h-4 w-4"
                          />
                          <span className="ml-2">{state.columns[c].title}</span>
                        </li>
                      );

                      // More context: https://github.com/atlassian/react-beautiful-dnd/issues/499#issuecomment-471334917
                      if (snapshot.isDragging && portal) {
                        return ReactDOM.createPortal(item, portal);
                      }

                      return item;
                    }}
                  </Draggable>
                ))}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default OrganizeGroupTasks;
