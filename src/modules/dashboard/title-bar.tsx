import { Bars3Icon } from "@heroicons/react/24/solid";
import useSidebarStore from "../stores/useSidebarStore";

const ProjectTitleBar = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);

  return (
    <div className="mx-auto bg-gray-100 px-4 py-3">
      <div className="inline-flex items-center justify-between">
        <button className="" title="Toggle Sidebar" onClick={toggleSidebar}>
          <Bars3Icon aria-hidden="true" className="h-5 w-5" />
        </button>

        <strong className="ml-2 text-sm text-gray-800">Project</strong>
      </div>
    </div>
  );
};

export default ProjectTitleBar;
