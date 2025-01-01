import { Router } from "express";
import { addTaskToDb, getTaskByIdFromDb, getAllTasksFromDb, updateTaskInDb, deleteTaskFromDb } from "./controllers.mongo.js";

const router = Router();

router.route("/tasks").post(addTaskToDb);

router.route("/tasks").get(getAllTasksFromDb);
router.route("/tasks/:id").get(getTaskByIdFromDb);

router.route("/tasks/:id").put(updateTaskInDb);

router.route("/tasks/:id").delete(deleteTaskFromDb);

export default router;
