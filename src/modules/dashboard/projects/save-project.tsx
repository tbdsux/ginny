import { CheckIcon } from "@heroicons/react/24/solid";
import deepEqual from "deep-equal";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { shallow } from "zustand/shallow";
import useProject from "../../stores/useProject";

const SaveProject = () => {
  const [saving, setSaving] = useState(false);
  const [project, stateProject] = useProject(
    (s) => [s.project, s.stateProject],
    shallow
  );

  const saveProject = async () => {
    if (!project || !stateProject) return;

    const isEqual = deepEqual(stateProject, project, { strict: true });

    if (isEqual) {
      // do nothing, there's no changes made
      return;
    }

    setSaving(true);

    const r = await fetch(`/api/projects/${project.key}`, {
      method: "PATCH",
      body: JSON.stringify({ project: stateProject }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!r.ok) {
      // failed request
      toast.error("Failed to update project. Please try again later...");
      return;
    }

    toast.success("Succesfully updated project.");
    await mutate(`/api/projects/${project.key}`);
    setSaving(false);
  };

  return (
    <>
      <button
        disabled={saving}
        onClick={saveProject}
        className="m-1 inline-flex items-center rounded-lg bg-gray-300 py-1 px-3 font-medium text-gray-900 duration-300 hover:bg-gray-400"
      >
        <CheckIcon aria-hidden="true" className="h-4 w-4" />

        <small className="ml-1">{saving ? "Saving..." : "Save"}</small>
      </button>
    </>
  );
};

export default SaveProject;
