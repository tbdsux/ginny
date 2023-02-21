import Router from "@ootiq/next-api-router";
import { projectsBase } from "../../../../lib/deta";
import { ProjectProps } from "../../../../typings/project";

interface RequestBody {
  project: ProjectProps;
}

const projectKeyApi = new Router()
  .all((req, res) => {
    res.status(404).json({ error: true, message: "404 Not Found" });
  })

  // update project key
  .patch(async (req, res) => {
    const { project } = req.body as RequestBody;
    const { key, ...iProject } = project;

    try {
      await projectsBase.put(iProject, key);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: true, message: String(e) });
      return;
    }

    res
      .status(200)
      .json({ error: false, message: "Successfully update project." });
  })

  .handle();

export default projectKeyApi;
