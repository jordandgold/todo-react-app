"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const projects_1 = require("../controllers/projects");
const router = (0, express_1.Router)();
// todos
router.get("/todos/get", todos_1.getTodos);
router.get("/todos/getByProjectId/:id", todos_1.getTodosByProjectId);
router.post("/todos/add", todos_1.addTodo);
router.put("/todos/edit/:id", todos_1.updateTodo);
router.delete("/todos/delete/:id", todos_1.deleteTodo);
// projects
router.get("/projects/get", projects_1.getProjects);
router.post("/projects/add", projects_1.addProject);
router.delete("/projects/delete/:id", projects_1.deleteProject);
exports.default = router;
