import { Dialog } from "@headlessui/react";
import { RectangleStackIcon } from "@heroicons/react/24/solid";
import { FormEvent, useRef } from "react";
import { toast } from "react-toastify";
import BaseModal from "../../../components/modal";
import useProject from "../../stores/useProject";

interface UpdateTaskProps {
  isOpen: boolean;
  closeModal: () => void;
  defTaskId: string;
  defValue: string;
}

const UpdateTask = ({
  defTaskId,
  defValue,
  isOpen,
  closeModal,
}: UpdateTaskProps) => {
  const [state, setState] = useProject((s) => [
    s.stateProject,
    s.updateStateProject,
  ]);

  const inputTaskRef = useRef<HTMLTextAreaElement>(null);

  const updateTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state) return;

    const task = inputTaskRef.current?.value;
    if (!task) {
      toast.warning("Task is empty.");
      return;
    }

    if (defTaskId === "") return;

    setState({
      ...state,
      tasks: {
        ...state.tasks,
        [defTaskId]: {
          ...state.tasks[defTaskId],
          content: task,
        },
      },
    });

    closeModal();
  };

  return (
    <BaseModal
      open={isOpen}
      closeModal={closeModal}
      className="max-w-xl rounded-xl bg-white p-8 text-left"
    >
      <Dialog.Title className="font-extrabold tracking-wide text-gray-700">
        Update Task
      </Dialog.Title>
      <Dialog.Description className="mt-1 text-sm text-gray-600">
        Tip: Make your task short and concise.
      </Dialog.Description>

      <Dialog.Panel className="mt-6 md:mx-8">
        <form onSubmit={updateTask}>
          <div className="my-1 flex flex-col">
            <label htmlFor="task" className="text-sm text-gray-600">
              Your task / todo
            </label>
            <textarea
              defaultValue={defValue}
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
              <small className="ml-1 font-medium uppercase">UPDATE TASK</small>
            </button>
          </div>
        </form>
      </Dialog.Panel>
    </BaseModal>
  );
};

export default UpdateTask;
