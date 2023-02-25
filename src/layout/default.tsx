import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import Link from "next/link";
import { ReactNode, useState } from "react";
import NewProject from "../modules/projects/new-project";
import useFetchProjects from "../modules/projects/useFetchProjects";
import useProject from "../modules/stores/useProject";
import useSidebarStore from "../modules/stores/useSidebarStore";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const allProjects = useFetchProjects();
  const [openSidebar, toggleSidebar] = useSidebarStore((state) => [
    state.open,
    state.toggle,
  ]);
  const currentProject = useProject((s) => s.project);

  return (
    <div className="relative flex items-start justify-between">
      {openSidebar ? (
        <>
          <div
            onClick={toggleSidebar}
            className="absolute inset-0 z-[45] h-screen w-full bg-black/20 lg:hidden"
          ></div>

          <aside
            className="absolute top-0 left-0 z-50 h-screen w-64 overflow-auto bg-gray-50 lg:fixed"
            aria-label="Sidebar"
          >
            <button
              title="Close Sidebar"
              className="absolute top-2 right-2 lg:hidden"
              onClick={toggleSidebar}
            >
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto py-4 px-3 text-gray-500">
              <Link href="/" className="mb-5 flex flex-col pl-2.5">
                <span className="whitespace-nowrap font-black uppercase tracking-wider dark:text-white">
                  Gin Web
                </span>
                <small>Projects Workspace</small>
              </Link>

              <div className="flex flex-col space-y-2">
                <NewProject />

                <hr className="my-8" />

                <div className="mt-4">
                  <CollapsiblePrimitive.Root
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <CollapsiblePrimitive.Trigger
                      className={`flex w-full items-center justify-between py-3 px-4 text-xs text-gray-500 duration-300 hover:text-gray-700 `}
                    >
                      <span className="font-bold uppercase tracking-wider">
                        Projects
                      </span>

                      {isOpen ? (
                        <ChevronUpIcon
                          aria-hidden="true"
                          className="ml-2 h-5 w-5"
                        />
                      ) : (
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="ml-2 h-5 w-5"
                        />
                      )}
                    </CollapsiblePrimitive.Trigger>

                    {allProjects ? (
                      allProjects.error ? (
                        <p className="text-sm">Failed to load projects...</p>
                      ) : (
                        <CollapsiblePrimitive.Content className="ml-4 flex flex-col text-[0.825rem] font-medium">
                          {allProjects.data
                            .sort((a, b) => b.created_at - a.created_at)
                            .map((project, i) => (
                              <div key={i} className="my-1 w-full">
                                <Link
                                  href={`/p/${project.key}`}
                                  className={`flex w-full items-center truncate rounded-md py-2 px-4 text-left tracking-wide text-gray-700 hover:bg-gray-100 ${
                                    project.key === currentProject?.key
                                      ? "bg-gray-100"
                                      : ""
                                  }`}
                                >
                                  {project.key === currentProject?.key ? (
                                    <span>
                                      <PlayIcon
                                        aria-hidden="true"
                                        className="h-4 w-4"
                                      />
                                    </span>
                                  ) : (
                                    <></>
                                  )}

                                  <span className="ml-2 truncate">
                                    {project.name}
                                  </span>
                                </Link>
                              </div>
                            ))}
                        </CollapsiblePrimitive.Content>
                      )
                    ) : (
                      <></>
                    )}
                  </CollapsiblePrimitive.Root>
                </div>
              </div>
            </div>
          </aside>
        </>
      ) : (
        <></>
      )}

      <div
        className={`z-20 w-full lg:w-auto ${
          openSidebar ? "ml-0 lg:ml-64" : ""
        }`}
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
