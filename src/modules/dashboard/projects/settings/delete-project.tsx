import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import useProject from "../../../stores/useProject";

const DeleteProject = () => {
  const router = useRouter();

  const [state, initStore] = useProject((s) => [s.stateProject, s.initStore]);
  const [deleting, setDeleting] = useState(false);

  const deleteProject = async () => {
    if (!state) return;

    setDeleting(true);
    const r = await fetch(`/api/projects/${state.key}`, {
      method: "DELETE",
    });

    if (!r.ok) {
      setDeleting(false);

      // some unknown error in here
      toast.error(
        "Some unknown problem caused deleting of the project to fail. Please try again later."
      );
      return;
    }

    // mutate
    await mutate("/api/projects");

    // reset store
    initStore(undefined);

    toast.success("Successfully deleted project.");

    setTimeout(() => {
      // return to index page if deleted
      router.push("/");
    }, 1000);
  };

  return (
    <div>
      <h3 className="text-sm font-bold uppercase leading-loose text-gray-700 underline">
        Delete Project
      </h3>
      <p className="text-sm text-gray-600">
        Remove / delete this project from my workspace. Everything will be
        removed along with your project, group tasks and tasks.
      </p>

      <button
        disabled={deleting}
        onClick={deleteProject}
        className="mt-4 inline-flex items-center rounded-lg bg-red-400 py-3 px-8 uppercase text-white duration-300 hover:bg-red-500"
      >
        <TrashIcon aria-hidden="true" className="mr-2 h-4 w-4" />
        <span className="text-xs font-medium">
          {deleting ? "Deleting..." : "Delete"}
        </span>
      </button>
    </div>
  );
};

export default DeleteProject;
