import { create } from "zustand";
import { ProjectProps } from "../../typings/project";

interface ProjectStoreProps {
  project?: ProjectProps;
  initStore: (p: ProjectProps | undefined) => void;

  // THIS IS TO USE FOR MODIFICATION
  // AND WILL BE USED TO COMPARE WITH THE STATE ABOVE
  stateProject?: ProjectProps;
  updateStateProject: (p: ProjectProps) => void;
}

const useProject = create<ProjectStoreProps>()((set) => ({
  project: undefined,
  initStore: (p) => set({ project: p, stateProject: p }),

  stateProject: undefined,
  updateStateProject: (p) => set({ stateProject: p }),
}));

export default useProject;
