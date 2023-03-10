import { GetServerSideProps } from "next";
import { projectsBase } from "../../lib/deta";
import { joinParams } from "../../lib/utils";
import ProjectPublicPage from "../../modules/dashboard/projects/public/public-page";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const key = joinParams(params?.key);
  if (!key) {
    return {
      notFound: true,
    };
  }

  const project = await projectsBase.get(key);
  if (!project) return { notFound: true };

  // false or is undefined
  if (!project.publicShare) return { notFound: true };

  return {
    props: {
      project,
    },
  };
};

export default ProjectPublicPage;
