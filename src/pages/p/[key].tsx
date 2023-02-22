import { GetServerSideProps } from "next";
import ProjectPage from "../../modules/dashboard/project-page";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : `https://${process.env.DETA_SPACE_APP_HOSTNAME}`; // env is catered for Deta Space

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

  const r = await fetch(`${apiUrl}/api/projects/${key}`, {
    headers: {
      "X-API-Key": process.env.DETA_SPACE_APP_HOSTNAME ?? "",
    },
  });
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
