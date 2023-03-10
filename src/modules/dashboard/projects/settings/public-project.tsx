import { GlobeAltIcon, LinkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { useApp } from "../../../../context/app";
import useProject from "../../../stores/useProject";

const PublicProject = () => {
  const state = useProject((s) => s.project);
  const { hostname } = useApp();

  const [updating, setUpdating] = useState(false);

  const publicProject = async (value: boolean) => {
    if (!state) return;

    setUpdating(true);
    const r = await fetch(`/api/projects/${state.key}/public`, {
      method: "POST",
      body: JSON.stringify({ publicShare: value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!r.ok) {
      setUpdating(false);

      // some unknown error in here
      toast.error(
        "Some unknown problem caused deleting of the project to fail. Please try again later."
      );
      return;
    }

    // mutate
    await mutate(`/api/projects/${state.key}`);
    setUpdating(false);

    toast.success(
      value ? "Project can now be shareable!" : "Project is now in private!"
    );
  };

  return (
    <div>
      <h3 className="text-sm font-bold uppercase leading-loose text-gray-700 underline">
        Public Project
      </h3>
      <p className="text-sm text-gray-600">
        Make your project&apos;s workspace public. A public url will be provided
        that you can use to share your project.
      </p>

      {state?.publicShare ? (
        <div className="relative mt-2 flex items-center rounded-lg bg-gray-200 py-2 px-4 text-sm">
          <span className="font-medium text-gray-700">
            {hostname === "" ? "http://localhost:3000" : `https://${hostname}`}
            /projects/{state.key}
          </span>

          <Link
            target="_blank"
            rel="noreferrer"
            href={
              (hostname === ""
                ? "http://localhost:3000"
                : `https://${hostname}`) + `/projects/${state.key}`
            }
            className="absolute inset-y-1 right-1 rounded-lg border bg-gray-300 p-1 hover:bg-gray-300"
          >
            <LinkIcon aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <></>
      )}

      {state?.publicShare ? (
        <button
          disabled={updating}
          onClick={() => publicProject(false)}
          className="mt-4 inline-flex items-center rounded-lg bg-gray-400 py-3 px-8 uppercase text-white duration-300 hover:bg-gray-500"
        >
          <GlobeAltIcon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span className="text-xs font-medium">
            {updating ? "Updating..." : "Set Private"}
          </span>
        </button>
      ) : (
        <button
          disabled={updating}
          onClick={() => publicProject(true)}
          className="mt-4 inline-flex items-center rounded-lg bg-blue-400 py-3 px-8 uppercase text-white duration-300 hover:bg-blue-500"
        >
          <GlobeAltIcon aria-hidden="true" className="mr-2 h-4 w-4" />
          <span className="text-xs font-medium">
            {updating ? "Updating..." : "Set Public"}
          </span>
        </button>
      )}
    </div>
  );
};

export default PublicProject;
