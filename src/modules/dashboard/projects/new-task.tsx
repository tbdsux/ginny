import { Dialog } from "@headlessui/react";
import { PlusSmallIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import BaseModal from "../../../components/modal";
import useOpen from "../../../hooks/useOpen";
import useProject from "../../stores/useProject";

interface NewTaskProps {
  col: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

const NewTask = ({ col }: NewTaskProps) => {
  const { isOpen, open, close } = useOpen();
  const [state, setState] = useProject((s) => [
    s.stateProject,
    s.updateStateProject,
  ]);

  const inputTaskRef = useRef<HTMLTextAreaElement>(null);

  const createTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state) return;

    const task = inputTaskRef.current?.value;
    if (!task) {
      toast.warning("Task is empty.");
      return;
    }

    const taskId = `task-${nanoid()}`;
    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [taskId]: {
          id: taskId,
          content: task,
        },
      },
      columns: {
        ...state.columns,
        [col.id]: {
          ...state.columns[col.id],
          taskIds: [taskId, ...state.columns[col.id].taskIds],
        },
      },
    });

    close();
  };

  return (
    <>
      <button onClick={open} title="New Task">
        <PlusSmallIcon aria-hidden="true" className="h-4 w-4" />
      </button>

      <BaseModal
        open={isOpen}
        closeModal={close}
        className="max-w-xl rounded-xl bg-white p-8 text-left"
      >
        <Dialog.Title className="font-extrabold tracking-wide text-gray-700">
          Create a Task | [{col.title}]
        </Dialog.Title>
        <Dialog.Description className="mt-1 text-sm text-gray-600">
          Tip: Make your task short and concise.
        </Dialog.Description>

        <Dialog.Panel className="mt-6 md:mx-8">
          <form onSubmit={createTask}>
            <div className="my-1 flex flex-col">
              <label htmlFor="task" className="text-sm text-gray-600">
                Your task / todo
              </label>
              <textarea
                ref={inputTaskRef}
                name="task"
                placeholder="Your task or todo ... "
                className="rounded-lg border-2 py-3 px-4 text-sm"
              ></textarea>
            </div>

            <div className="mt-3 text-right">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg border bg-gray-500 py-3 px-7 text-white duration-300 hover:bg-gray-600"
              >
                <RectangleStackIcon aria-hidden="true" className="h-4 w-4" />
                <small className="ml-1 font-medium uppercase">
                  CREATE TASK
                </small>
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </BaseModal>
    </>
  );
};

export default NewTask;
