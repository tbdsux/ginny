import useMounted from "../../hooks/useMounted";
import { ProjectProps } from "../../typings/project";
import useProject from "../stores/useProject";
import DashboardContainer from "./container";
import DashboardPlaceholder from "./placeholder";

import ProjectTitleBar from "./title-bar";

const initialData: ProjectProps = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
  },
  columns: {
    "col-1": {
      id: "col-1",
      title: "Group 1",
      taskIds: ["task-1", "task-2", "task-3"],
    },
    "col-2": {
      id: "col-2",
      title: "Group 2",
      taskIds: ["task-4"],
    },
  },
  columnOrder: ["col-1", "col-2"],
  name: "Example",
  key: "",
  description: "",
  created_at: new Date().getTime(),
};

const DashboardPage = () => {
  const mounted = useMounted();
  const state = useProject((s) => s.stateProject);

  return (
    <div>
      <ProjectTitleBar />

      {mounted && state ? <DashboardContainer /> : <DashboardPlaceholder />}
    </div>
  );
};

export default DashboardPage;
