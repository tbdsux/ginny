import { Bars3Icon } from "@heroicons/react/24/solid";
import useProject from "../stores/useProject";
import useSidebarStore from "../stores/useSidebarStore";
import NewTaskGroup from "./projects/new-taskgroup";
import SaveProject from "./projects/save-project";

const ProjectTitleBar = () => {
  const selectedProject = useProject((state) => state.project);
  const [openSidebar, toggleSidebar] = useSidebarStore((state) => [
    state.open,
    state.toggle,
  ]);

  return (
    <div
      className={`fixed top-0 right-0 z-40 mx-auto w-full bg-gray-100 py-3 ${
        openSidebar ? "pl-[17rem]" : "pl-4"
      } pr-4`}
    >
      <div className="flex items-center justify-between ">
        <div className="inline-flex items-center justify-between">
          <button className="" title="Toggle Sidebar" onClick={toggleSidebar}>
            <Bars3Icon aria-hidden="true" className="h-5 w-5" />
          </button>

          <strong className="ml-2 text-sm text-gray-800">
            {selectedProject
              ? selectedProject.name
              : "Welcome back! | Gin Workspace"}
          </strong>
        </div>

        {selectedProject ? (
          <div className="">
            <NewTaskGroup />
            <SaveProject />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProjectTitleBar;
