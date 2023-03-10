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

  const headers: HeadersInit =
    process.env.NODE_ENV === "development"
      ? {}
      : { "x-api-key": process.env.DETA_API_KEY ?? "" };

  const r = await fetch(`${apiUrl}/api/projects/${key}`, {
    headers,
  });
  const data = await r.json();

  if (r.status === 404) {
    return {
      notFound: true,
    };
  }

  if (!r.ok) {
    res.statusCode = 500;
    throw new Error("Internal server error. " + JSON.stringify(data));
  }

  return {
    props: {
      data,
      hostname: process.env.DETA_SPACE_APP_HOSTNAME ?? "",
    },
  };
};

export default ProjectPage;
