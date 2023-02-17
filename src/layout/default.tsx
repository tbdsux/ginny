import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { ReactNode, useState } from "react";
import { useProjects } from "../modules/projects/context";
import NewProject from "../modules/projects/new-project";
import useSidebarStore from "../modules/stores/useSidebarStore";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { projects } = useProjects();

  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useSidebarStore((state) => state.open);

  return (
    <div className="flex items-start justify-between">
      {openSidebar ? (
        <aside className="min-h-screen w-64 bg-gray-50" aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 text-gray-500">
            <a className="mb-5 flex items-center pl-2.5" href="#">
              <span className="whitespace-nowrap font-black tracking-wider dark:text-white">
                Ginny
              </span>
            </a>

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

                  <CollapsiblePrimitive.Content className="ml-4 flex flex-col text-xs">
                    {projects.map((project, i) => (
                      <button
                        key={i}
                        className="truncate rounded-lg py-2 px-4 text-left tracking-wide text-gray-700 hover:bg-gray-200"
                      >
                        {project.name}
                      </button>
                    ))}
                  </CollapsiblePrimitive.Content>
                </CollapsiblePrimitive.Root>
              </div>
            </div>
          </div>
        </aside>
      ) : (
        <></>
      )}

      <div className="w-full">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
