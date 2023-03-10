import Router from "@ootiq/next-api-router";
import { projectsBase } from "../../../../lib/deta";
import { joinParams } from "../../../../lib/utils";

interface RequestBody {
  publicShare: boolean;
}

const publicProjectApi = new Router()
  .all((req, res) => {
    res.status(404).json({ error: true, message: "404 Not Found" });
  })

  // handle
  .post(async (req, res) => {
    const { key } = req.query;

    const projectKey = joinParams(key);
    if (projectKey === "") return;

    const { publicShare } = req.body as RequestBody;

    const project = await projectsBase.get(projectKey);
    if (!project) {
      res.status(404).json({ error: true, message: "Project not found." });
      return;
    }

    await projectsBase.update({ publicShare }, projectKey);

    res.status(200).json({
      error: false,
      message: "Project's public status is now updated!",
    });
  })

  .handle();

export default publicProjectApi;
