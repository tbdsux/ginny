import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
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
  const [isOpen, setIsOpen] = useState();
  const allProjects = useFetchProjects();
  const openSidebar = useSidebarStore((state) => state.open);
  const currentProject = useProject((s) => s.project);

  return (
    <div className="relative flex items-start justify-between">
      {openSidebar ? (
        <aside
          className="fixed top-0 left-0 z-50 min-h-screen w-64 bg-gray-50"
          aria-label="Sidebar"
        >
          <div className="overflow-y-auto py-4 px-3 text-gray-500">
            <Link href="/" className="mb-5 flex items-center pl-2.5">
              <span className="whitespace-nowrap font-black tracking-wider dark:text-white">
                Ginny
              </span>
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
                      <CollapsiblePrimitive.Content className="ml-4 flex flex-col text-xs font-medium">
                        {allProjects.data.map((project, i) => (
                          <div key={i} className="w-full">
                            <Link
                              href={`/p/${project.key}`}
                              className={`flex w-full items-center truncate rounded-md py-2 px-4 text-left tracking-wide text-gray-700 hover:bg-gray-100 ${
                                project.key === currentProject?.key
                                  ? "bg-gray-100"
                                  : ""
                              }`}
                            >
                              {project.key === currentProject?.key ? (
                                <>
                                  <PlayIcon
                                    aria-hidden="true"
                                    className="h-4 w-4"
                                  />
                                </>
                              ) : (
                                <></>
                              )}

                              <span className="ml-2">{project.name}</span>
                            </Link>

                            <hr className="my-0.5" />
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
      ) : (
        <></>
      )}

      <div className={`z-20 ${openSidebar ? "ml-64" : ""}`}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
