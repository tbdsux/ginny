import { Deta } from "detajs-sm";

const deta = Deta();

const projectsBase = deta.Base("Projects");

export { deta, projectsBase };
