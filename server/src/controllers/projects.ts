import { Response, Request } from "express";
import Project from "../models/project";
import { IProject } from "../types/project";

const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects: IProject[] = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    throw error;
  }
};

const addProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IProject, "name">;

    const project: IProject = new Project({
      name: body.name,
    });

    const newProject: IProject = await project.save();
    const allProjects: IProject[] = await Project.find();

    res.status(201).json({
      message: "Project added",
      project: newProject,
      projects: allProjects,
    });
  } catch (error) {
    throw error;
  }
};

const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProject: IProject | null = await Project.findByIdAndRemove(
      req.params.id
    );
    const allProjects: IProject[] = await Project.find();
    res.status(200).json({
      message: "Project deleted",
      project: deletedProject,
      projects: allProjects,
    });
  } catch (error) {
    throw error;
  }
};

export { getProjects, addProject, deleteProject };
