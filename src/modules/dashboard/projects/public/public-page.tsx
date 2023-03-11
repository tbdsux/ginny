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

  const title =
    data && !data.error
      ? `${data.data.name} | Gin Web`
      : "Loading... | Gin Web";

  if (data?.error) {
    return <p>{data.message}</p>;
  }

  return (
    <div className="w-full">
      <Head>
        <title>{title}</title>
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

            <div className="inline-flex items-center">
              <a
                href="https://github.com/tbdsux/ginny"
                target="_blank"
                className="m-1 inline-flex items-center rounded-lg bg-gray-100 p-2 text-xs uppercase text-gray-700 duration-300 hover:bg-gray-200"
                rel="noreferrer"
                title="Visit github project"
              >
                <svg
                  className="h-4 w-4"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>

              <span className="m-1 rounded-lg bg-gray-300 py-1 px-4 text-xs font-medium tracking-wider text-gray-700">
                public
              </span>
            </div>
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
