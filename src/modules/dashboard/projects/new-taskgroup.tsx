import { Dialog } from "@headlessui/react";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import BaseModal from "../../../components/modal";
import useProject from "../../stores/useProject";

const NewTaskGroup = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const inputNameRef = useRef<HTMLInputElement>(null);

  const [state, setState] = useProject((s) => [
    s.stateProject,
    s.updateStateProject,
  ]);
  const createGroup = () => {
    if (!state) return;

    const name = inputNameRef.current?.value;
    if (!name) {
      toast.error("Group name cannot be empty.");
      return;
    }

    const colId = `col-${nanoid(6)}`;

    setState({
      ...state,
      columns: {
        ...state.columns,
        [colId]: {
          id: colId,
          taskIds: [],
          title: name,
        },
      },
      columnOrder: [...state.columnOrder, colId],
    });

    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="m-1 inline-flex items-center rounded-lg bg-gray-500 py-1 px-3 text-white duration-300 hover:bg-gray-600"
      >
        <SquaresPlusIcon aria-hidden="true" className="h-4 w-4" />

        <small className="ml-1 hidden lg:block">Create Task Group</small>
        <small className="ml-1 hidden md:block lg:hidden">Create</small>
      </button>

      <BaseModal
        open={open}
        closeModal={closeModal}
        className="max-w-xl rounded-xl bg-white p-8 text-left"
      >
        <Dialog.Title className="font-extrabold tracking-wide text-gray-700">
          Add a New Task Group
        </Dialog.Title>
        <Dialog.Description className="mt-1 text-sm text-gray-600">
          Organize your tasks using groups, you can drag and drop columns and
          tasks as you wish.
        </Dialog.Description>

        <Dialog.Panel className="mt-6 md:mx-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              createGroup();
            }}
          >
            <div className="my-1 flex flex-col">
              <label htmlFor="name" className="text-sm text-gray-600">
                Task Group Name
              </label>
              <input
                ref={inputNameRef}
                type="text"
                className="rounded-lg border-2 py-3 px-4 text-sm"
                placeholder="Enter a name for the task group..."
              />
            </div>

            <div className="mt-3 text-right">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg border bg-gray-500 py-3 px-7 text-white duration-300 hover:bg-gray-600"
              >
                <SquaresPlusIcon aria-hidden="true" className="h-4 w-4" />
                <small className="ml-1 font-medium uppercase">
                  CREATE GROUP
                </small>
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </BaseModal>
    </>
  );
};

export default NewTaskGroup;
