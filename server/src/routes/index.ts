import { Router } from "express";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

const router: Router = Router();

router.get("/todos/get", getTodos);
router.post("/todos/add", addTodo);
router.put("/todos/edit/:id", updateTodo);
router.delete("/todos/delete/:id", deleteTodo);

export default router;
