import Head from "next/head";
import { useEffect } from "react";
import DefaultLayout from "../../layout/default";
import useProject from "../stores/useProject";
import DashboardPlaceholder from "./placeholder";

import ProjectTitleBar from "./title-bar";

const DashboardPage = () => {
  const initStore = useProject((s) => s.initStore);

  useEffect(() => {
    // reset the store if switch to home page
    initStore(undefined);
  }, [initStore]);

  return (
    <DefaultLayout>
      <div>
        <Head>
          <title>Gin Web | Project Management Workspace</title>
        </Head>

        <ProjectTitleBar />

        <DashboardPlaceholder />
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
