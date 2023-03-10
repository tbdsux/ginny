import { CubeIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import logoImg from "../../../../assets/icon.png";
import fetcher from "../../../../lib/fetcher";
import { APIResponseProps } from "../../../../typings/api";
import { ProjectProps } from "../../../../typings/project";
import GroupColumnP from "./column";

interface ProjectPublicPageProps {
  project: ProjectProps;
}

const ProjectPublicPage = ({ project }: ProjectPublicPageProps) => {
  const { data } = useSWR<APIResponseProps<ProjectProps>>(
    `/api/projects/${project.key}`,
    fetcher,
    {
      fallbackData: { error: false, data: project },
    }
  );

  if (data?.error) {
    return <p>{data.message}</p>;
  }

  return (
    <div className="w-full">
      <Head>
        <title>{data?.data.name} | Gin Web</title>
      </Head>

      <div>
        <div className="fixed top-0 right-0 z-40 mx-auto w-full bg-gray-100 p-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="inline-flex items-center">
              <div className="h-10 w-10">
                <Image src={logoImg} alt="Gin Web" className="rounded-xl" />
              </div>

              <div className="ml-4 inline-flex items-center">
                <CubeIcon className="h-4 w-4" />
                <strong className="ml-2 text-gray-800">
                  {data?.data?.name}
                </strong>
              </div>
            </div>

            <span className="rounded-lg bg-gray-300 py-1 px-4 text-xs font-medium tracking-wider text-gray-700">
              public
            </span>
          </div>
        </div>

        <div className="z-30 w-full px-4 pt-24">
          <div className="flex w-full flex-col items-stretch lg:flex-row lg:items-start">
            {data?.data?.columnOrder.map((col, index) => (
              <GroupColumnP
                col={data?.data?.columns[col]}
                tasks={data?.data?.columns[col].taskIds.map(
                  (id) => data?.data?.tasks[id]
                )}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPublicPage;
