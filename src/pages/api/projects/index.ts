import Router from "@ootiq/next-api-router";
import { projectsBase } from "../../../lib/deta";
import { IProjectProps } from "../../../typings/project";

interface RequestBody {
  name: string;
  description?: string;
}

const projectsApi = new Router()
  .all((req, res) => {
    res.status(404).json({ error: true, message: "404 Not Found" });
  })

  // new project
  .put(async (req, res) => {
    const { name, description } = req.body as RequestBody;

    if (name.trim() === "") {
      res
        .status(400)
        .json({ error: true, message: "Project name cannot be empty." });
      return;
    }

    const project: IProjectProps = {
      name,
      description,
      created_at: Math.floor(new Date().getTime() / 1000),
      tasks: {},
      columns: {},
      columnOrder: [],
    };

    try {
      await projectsBase.put(project);
    } catch (e) {
      res.status(500).json({ error: true, message: String(e) });
      return;
    }

    res
      .status(200)
      .json({ error: false, message: "Successfully created new project." });
  })

  // fetch all projects
  .get(async (req, res) => {
    let r = await projectsBase.fetch();
    let allItems = r.items;

    while (r.last) {
      r = await projectsBase.fetch({}, { last: r.last, limit: 100 });
      allItems = [...allItems, ...r.items];
    }

    res.json({ error: false, data: allItems });
  })
  .handle();

export default projectsApi;
