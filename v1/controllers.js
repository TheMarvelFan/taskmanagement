import fs from "fs";

const addTask = async (req, res) => {
    // fields in task json: title, description, status
    const { title, description, status } = req.body;

    // validate the status field. It must be either "pending", "in-progress" or "completed"
    if (status && !["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({error: "Status must be either 'pending', 'in-progress' or 'completed'"});
    }

    // write new tasks to the file db.json. It will be initially an empty array and new tasks need to be appended to it
    const newTask = {
        id: Date.now(),
        title, // title must be "pending", "in-progress" or "completed"
        description,
        status: status || "pending",
    }

    // read the file db.json
    const tasks = JSON.parse(fs.readFileSync("./v1/db.json", "utf-8"));

    // append new task to the tasks array
    tasks.push(newTask);

    // write the updated tasks array back to the file db.json
    fs.writeFileSync("./v1/db.json", JSON.stringify(tasks));

    // send the new task as response
    res.status(201).json(newTask);
};

const getAllTasks = async (req, res) => {
    // read the file db.json
    const tasks = JSON.parse(fs.readFileSync("./v1/db.json", "utf-8"));
    res.status(200).json(tasks);
};

const getTaskById = async (req, res) => {
    // read the file db.json
    const tasks = JSON.parse(fs.readFileSync("./v1/db.json", "utf-8"));

    // get the task id from the request parameters
    const { id } = req.params;

    // find the task with the given id
    const task = tasks.find((task) => task.id === parseInt(id));

    // if task is not found, send 404 response
    if (!task) {
        return res.status(404).json({error: "Task not found"});
    }

    // send the task as response
    res.status(200).json(task);
};

const updateTask = async (req, res) => {
    // read the file db.json
    const tasks = JSON.parse(fs.readFileSync("./v1/db.json", "utf-8"));

    // ensure that title and description cannot be updated

    if (req.body.title || req.body.description) {
        return res.status(400).json({error: "Title and description cannot be updated!"});
    }

    // getting the new status from the request body. It must be either "pending", "in-progress" or "completed"
    const { status } = req.body;

    // if status is not provided, send 400 response
    if (!status) {
        return res.status(400).json({error: "Status is required"});
    }

    // validate the status field. It must be either "pending", "in-progress" or "completed"
    if (!["pending", "in-progress", "completed"].includes(status)) {
        return res.status(400).json({error: "Status which must be either 'pending', 'in-progress' or 'completed'."});
    }

    // get the task id from the request parameters
    const { id } = req.params;

    // find the task with the given id
    const task = tasks.find((task) => task.id === parseInt(id));

    // if task is not found, send 404 response
    if (!task) {
        return res.status(404).json({error: "Task not found"});
    }

    // update the task status
    task.status = status;

    // write the updated tasks array back to the file db.json
    fs.writeFileSync("./v1/db.json", JSON.stringify(tasks));

    // send the updated task as response
    res.status(200).json(task);
};

const deleteTask = async (req, res) => {
    // read the file db.json
    const tasks = JSON.parse(fs.readFileSync("./v1/db.json", "utf-8"));

    // get the task id from the request parameters
    const { id } = req.params;

    // find the task with the given id
    const task = tasks.find((task) => task.id === parseInt(id));

    // if task is not found, send 404 response
    if (!task) {
        return res.status(404).json({error: "Task not found"});
    }

    // remove the task from the tasks array
    const updatedTasks = tasks.filter((task) => task.id !== parseInt(id));

    // write the updated tasks array back to the file db.json
    fs.writeFileSync("./v1/db.json", JSON.stringify(updatedTasks));

    // send the deleted task as response
    res.status(200).json({message: `Task with ID ${id} deleted successfully`});
};

export { addTask, getAllTasks, getTaskById, updateTask, deleteTask };
