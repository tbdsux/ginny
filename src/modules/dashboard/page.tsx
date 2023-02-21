import Head from "next/head";
import { useEffect } from "react";
import useProject from "../stores/useProject";
import DashboardPlaceholder from "./placeholder";

import ProjectTitleBar from "./title-bar";

const DashboardPage = () => {
  const initStore = useProject((s) => s.initStore)

  useEffect(() => {
    // reset the store if switch to home page
    initStore(undefined)
  }, [initStore])

  return (
    <div>
      <Head>
        <title>Gin Web | Project Management Workspace</title>
      </Head>

      <ProjectTitleBar />

      <DashboardPlaceholder />
    </div>
  );
};

export default DashboardPage;
