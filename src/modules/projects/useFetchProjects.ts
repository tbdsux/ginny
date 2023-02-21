import useSWR from "swr";
import fetcher from "../../lib/fetcher";
import { APIResponseProps } from "../../typings/api";
import { ProjectProps } from "../../typings/project";

const useFetchProjects = () => {
  const { data } = useSWR<APIResponseProps<ProjectProps[]>>(
    "/api/projects",
    fetcher
  );

  return data;
};

export default useFetchProjects;
