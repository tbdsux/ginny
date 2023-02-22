import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import useProject from "../../../stores/useProject";

const RenameProject = () => {
  const [updating, setUpdating] = useState(false);
  const project = useProject((s) => s.project);
  const inputNewNameRef = useRef<HTMLInputElement>(null);

  const renameProject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!project) return;

    const newName = inputNewNameRef.current?.value;
    if (!newName) return;

    setUpdating(true);

    console.log(newName);

    const r = await fetch(`/api/projects/${project.key}`, {
      method: "POST",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setUpdating(false);
    if (!r.ok) {
      const data = await r.json();
      toast.error(data.message);
      return;
    }

    // mutate
    await mutate(`/api/projects/${project.key}`);
    await mutate(`/api/projects`);

    toast.success("Successfully renamed project.");
  };

  return (
    <div>
      <h3 className="text-sm font-bold uppercase leading-loose text-gray-700 underline">
        Rename Project
      </h3>
      <form onSubmit={renameProject}>
        <div className="flex flex-col">
          <label htmlFor="rename" className="text-xs font-medium text-gray-600">
            New Project Name ({project?.name})
          </label>
          <div className="mt-1 flex items-stretch">
            <input
              ref={inputNewNameRef}
              type="text"
              placeholder="Enter new name for your project"
              defaultValue={project?.name}
              className="w-full rounded-md border py-2 px-4 text-sm"
            />

            <button
              disabled={updating}
              type="submit"
              className="ml-2 inline-flex items-center rounded-lg bg-gray-400 py-2 px-6 text-white duration-300 hover:bg-gray-500"
            >
              <PencilSquareIcon aria-hidden="true" className="mr-2 h-4 w-4" />
              <span className="text-xs font-medium uppercase">
                {updating ? "Saving..." : "Rename"}
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RenameProject;
