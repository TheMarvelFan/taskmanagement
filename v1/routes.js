import { Router } from "express";
import { addTask, getAllTasks, getTaskById, updateTask, deleteTask } from "./controllers.js";

const router = Router();

router.route("/tasks").post(addTask);

router.route("/tasks").get(getAllTasks);
router.route("/tasks/:id").get(getTaskById);

router.route("/tasks/:id").put(updateTask);

router.route("/tasks/:id").delete(deleteTask);

export default router;
