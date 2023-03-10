import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { AppProvider } from "../../context/app";
import useMounted from "../../hooks/useMounted";
import DefaultLayout from "../../layout/default";
import fetcher from "../../lib/fetcher";
import { APIResponseProps } from "../../typings/api";
import { ProjectProps } from "../../typings/project";
import useProject from "../stores/useProject";
import DashboardContainer from "./container";
import ProjectTitleBar from "./title-bar";

interface ProjectPageProps {
  data: APIResponseProps<ProjectProps>;
  hostname: string;
}

const ProjectPage = (props: ProjectPageProps) => {
  const router = useRouter();
  const { key } = router.query;

  const mounted = useMounted();
  const { data } = useSWR<APIResponseProps<ProjectProps>>(
    key ? `/api/projects/${key}` : undefined,
    fetcher,
    {
      fallbackData: props.data,
    }
  );

  const title =
    data && !data.error
      ? `${data.data.name} | Gin Web`
      : "Loading... | Gin Web";

  const initStore = useProject((s) => s.initStore);

  useEffect(() => {
    if (data) {
      if (data.error) return;

      initStore(data.data);
    }
  }, [data, initStore]);

  return (
    <DefaultLayout>
      <AppProvider hostname={props.hostname}>
        <Head>
          <title>{title}</title>
        </Head>

        <ProjectTitleBar />

        {mounted && <DashboardContainer />}
      </AppProvider>
    </DefaultLayout>
  );
};

export default ProjectPage;
