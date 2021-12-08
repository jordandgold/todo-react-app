import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";
import { getProjects } from "../controllers/projects";

const router: Router = Router();

// todos
router.get("/todos/get", getTodos);
router.post("/todos/add", addTodo);
router.put("/todos/edit/:id", updateTodo);
router.delete("/todos/delete/:id", deleteTodo);

// projects
router.get("/projects/get", getProjects);

export default router;
