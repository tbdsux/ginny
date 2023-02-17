import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { ProjectProps } from "./types";

interface ProjectsContextProps {
  projects: ProjectProps[];
  setProjects: Dispatch<SetStateAction<ProjectProps[]>>;
  selectedProject: ProjectProps | null;
  setSelectedProject: Dispatch<SetStateAction<ProjectProps | null>>;
}

const ProjectsContext = createContext<ProjectsContextProps>({
  projects: [],
  setProjects: () => {},
  selectedProject: null,
  setSelectedProject: () => {},
});

interface ProjectsProviderProps {
  children: ReactNode;
}

const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(
    null
  );

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, selectedProject, setSelectedProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined)
    throw new Error("<ProjectsProvider></ProjectsProvider>");

  return context;
};

export default ProjectsProvider;
