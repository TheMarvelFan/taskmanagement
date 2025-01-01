import { Task } from './Task.js';
import {asyncHandler} from "./asyncHandler.js";

const addTaskToDb = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;

    if (!["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({"message": "Status must be either 'pending', 'in-progress' or 'completed'"});
    }

    const task = new Task({ title, description, status });
    await task.save();

    return res.status(201).json(task);
});

const getAllTasksFromDb = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json(tasks);
});

const getTaskByIdFromDb = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
        return res.status(404).json({"message": "Task not found"});
    }

    return res.status(200).json(task);
});

const updateTaskInDb = asyncHandler(async (req, res) => {
    const taskId = req.params.id;

    if (req.body.title || req.body.description) {
        return res.status(400).json({"message": "Title and Description cannot be updated!"});
    }

    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({"message": "Task not found"});
    }

    return res.status(200).json(task);
});

const deleteTaskFromDb = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if(!deletedTask) {
        return res.status(404).json({"message": "Task not found"});
    }

    return res.status(200).json({"message": "Task deleted successfully!"});
});

export {
    addTaskToDb,
    getTaskByIdFromDb,
    getAllTasksFromDb,
    updateTaskInDb,
    deleteTaskFromDb
};
