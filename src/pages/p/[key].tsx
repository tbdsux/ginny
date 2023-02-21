import { GetServerSideProps } from "next";
import ProjectPage from "../../modules/dashboard/project-page";

// TODO: update to be used with Deta Space
const apiUrl = "http://localhost:3000";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  const key = Array.isArray(params?.key) ? params?.key.join() : params?.key;
  if (!key) {
    return {
      notFound: true,
    };
  }

  const r = await fetch(`${apiUrl}/api/projects/${key}`);
  const data = await r.json();

  if (r.status === 404) {
    return {
      notFound: true,
    };
  }

  if (!r.ok) {
    res.statusCode = 500;
    throw new Error("Internal server error.");
  }

  return {
    props: {
      data,
    },
  };
};

export default ProjectPage;
