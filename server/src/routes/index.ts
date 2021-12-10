import { Router } from "express";
import {
  getTodos,
  getTodosByProjectId,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import {
  getProjects,
  addProject,
  deleteProject,
} from "../controllers/projects";

const router: Router = Router();

// todos
router.get("/todos/get", getTodos);
router.get("/todos/getByProjectId/:id", getTodosByProjectId);
router.post("/todos/add", addTodo);
router.put("/todos/edit/:id", updateTodo);
router.delete("/todos/delete/:id", deleteTodo);

// projects
router.get("/projects/get", getProjects);
router.post("/projects/add", addProject);
router.delete("/projects/delete/:id", deleteProject);

export default router;
