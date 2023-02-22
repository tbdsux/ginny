import Router from "@ootiq/next-api-router";
import { projectsBase } from "../../../../lib/deta";
import { ProjectProps } from "../../../../typings/project";

interface RequestBody {
  project: ProjectProps;
}

interface RequestBodyUpdateName {
  name: string;
}

const projectKeyApi = new Router()
  .all((req, res) => {
    res.status(404).json({ error: true, message: "404 Not Found" });
  })

  // update project name
  .post(async (req, res) => {
    const { key } = req.query;
    const projectKey = Array.isArray(key) ? key.join() : key;

    if (!projectKey) return;

    const { name } = req.body as RequestBodyUpdateName;
    if (!name) {
      res.status(400).json({ error: true, message: "Bad request body." });
      return;
    }

    await projectsBase.update({ name }, projectKey);

    res
      .status(200)
      .json({ error: false, message: "Successfully updated project name." });
  })

  // delete project
  .delete(async (req, res) => {
    const { key } = req.query;
    const projectKey = Array.isArray(key) ? key.join() : key;

    if (!projectKey) return;

    await projectsBase.delete(projectKey);

    res.json({ error: false, message: "Successfully deleted project." });
  })

  // fetch project with key
  .get(async (req, res) => {
    const { key } = req.query;
    const projectKey = Array.isArray(key) ? key.join() : key;

    if (!projectKey) return;

    const r = await projectsBase.get<ProjectProps>(projectKey);
    if (!r) {
      res.status(404).json({ error: true, message: "Project not found." });
      return;
    }

    res.json({ error: false, data: r });
  })

  // update project
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
