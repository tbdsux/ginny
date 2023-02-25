import { Deta } from "detajs-sm";
import { ProjectProps } from "../typings/project";

const deta = Deta();

const projectsBase = deta.Base<ProjectProps>("Projects");

export { deta, projectsBase };
