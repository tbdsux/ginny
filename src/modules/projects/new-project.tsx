import { Dialog } from "@headlessui/react";
import { FolderPlusIcon } from "@heroicons/react/24/solid";
import { useRef } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import BaseModal from "../../components/modal";
import useOpen from "../../hooks/useOpen";

const NewProject = () => {
  const { isOpen, open, close } = useOpen();

  const inputNameRef = useRef<HTMLInputElement>(null);

  const createProject = async () => {
    const name = inputNameRef.current?.value ?? "";

    if (name == "") {
      return;
    }

    const r = await fetch("/api/projects", {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const d = await r.json();

    if (!r.ok) {
      // TODO: handle error
      console.error(d);

      return;
    }

    toast.success("Successfully created new project.");
    await mutate("/api/projects");
    close();
  };

  return (
    <div>
      <BaseModal
        open={isOpen}
        closeModal={close}
        className="max-w-xl rounded-xl bg-white p-8 text-left"
      >
        <Dialog.Title className="font-extrabold tracking-wide text-gray-700">
          Create new project
        </Dialog.Title>

        <Dialog.Panel className="mx-8">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              await createProject();
            }}
          >
            <div className="my-2 flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-600"
              >
                Project name:
              </label>
              <input
                ref={inputNameRef}
                type="text"
                name="name"
                id="name"
                className="mt-1 rounded-xl border py-3 px-6 text-sm"
                placeholder="A new project..."
              />
            </div>

            <div className="mt-4 text-right">
              <button
                type="submit"
                className="inline-flex items-center rounded-xl bg-gray-100 py-3 px-8 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <FolderPlusIcon aria-hidden="true" className="mr-2 h-5 w-5" />
                Create Project
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </BaseModal>

      <button
        onClick={open}
        className="inline-flex w-full items-center rounded-lg bg-gray-100 py-2 px-6 text-xs text-gray-700 duration-300 hover:bg-gray-200"
      >
        <FolderPlusIcon aria-hidden="true" className="h-4 w-4" />

        <span className="ml-1 font-medium uppercase tracking-wide">
          New Project
        </span>
      </button>
    </div>
  );
};

export default NewProject;
