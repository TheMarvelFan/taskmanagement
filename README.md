# Task Management System

This is a simple task management system built with Node.js, Express, and MongoDB.
There are two types of routes in the project:
- v1: Uses a JSON file for storing tasks
- v2: Uses MongoDB for storing tasks

After the project starts, you can access v2 routes at `http://localhost:<your-port>/v2/tasks`, and v1 routes at `http://localhost:<your-port>/v1/tasks`.
If there is an error starting the MongoDB server, the project will automatically switch to using the JSON file, and you will be notified to only use v1 tasks.

## Features

- Create, read, update, and delete tasks
- Tasks have a title, description, and status
- Status can be 'pending', 'in-progress', or 'completed'

## Prerequisites

- Node.js
- npm
- MongoDB (Or use the JSON file provided in v1 routes)

## Installation

1. Clone the repository.
    ```sh
    git clone https://github.com/TheMarvelFan/taskmanagement.git
    cd taskmanagement
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. If You wish to use MongoDB for storing data, create a `.env` file in the 'v2' directory and configure the following values:
    ```dotenv
    PORT=3000-or-any-other-free-port
    MONGODB_URI=mongodb://localhost:27017-or-your-mongodb-port/
    DB_NAME=taskmanagement-or-your-database-name
    ```
   I have provided a sample `.env.example` file in the 'v2' directory for reference.

4. Start the MongoDB server (or just skip this step if you are using the JSON file):
    ```sh
    mongod
    ```

5. Start the application:
    ```sh
    npm start
    ```

## API Endpoints

### v1 Routes
- `GET /v1/tasks` - Get all tasks from the JSON file
- `GET /v1/tasks/:id` - Get a task by ID from the JSON file
- `POST /v1/tasks` - Create a new task and append it to the JSON file
- `PUT /v1/tasks/:id` - Update a task by ID in the JSON file
- `DELETE /v1/tasks/:id` - Delete a task by ID from the JSON file

### v2 Routes
- `GET /v2/tasks` - Get all tasks from MongoDB
- `GET /v2/tasks/:id` - Get a task by ID from MongoDB
- `POST /v2/tasks` - Create a new task and store it in MongoDB
- `PUT /v2/tasks/:id` - Update a task by ID in MongoDB
- `DELETE /v2/tasks/:id` - Delete a task by ID from MongoDB

## Project Structure

### Project Files
- `/app.js` - Entry point of the application
- `/package.json` - Contains project metadata and dependencies
- `/v1/routes.js` - Contains v1 route definitions
- `/v1/controllers.js` - Contains controller logic
- `/v1/db.json` - JSON file for storing tasks (if not using MongoDB)
- `/v2/mongo.js` - MongoDB connection setup
- `/v2/Task.js` - Task model definition
- `/v2/.env.example` - Sample .env file for MongoDB configuration
- `/v2/routes.mongo.js` - Contains v2 route definitions
- `/v2/controllers.mongo.js` - Contains controller logic for MongoDB
- `/v2/asyncHandler.js` - Boilerplate for handling async functions

### Auto-Generated Files
- `/node_modules/` - Contains all project dependencies
- `/package-lock.json` - Lock file for npm dependencies

### Config Files You Need to Create
- `/v2/.env` - MongoDB Environment variables file (not included in the repository) if you want to use v2 routes

### README Files
- `/README.md` - Contains project information and instructions

## Usage

1. To create a new task, send a `POST` request to `/tasks` with the following JSON body:
    ```json
    {
        "title": "Task Title",
        "description": "Task Description",
        "status": "pending"
    }
    ```
    The status can be either 'pending', 'in-progress', or 'completed'.
    <br>
    <br>
    You can also send a body without the status field. In that case, the status will be by default set to 'pending'.
    ```json
    {
        "title": "Task Title",
        "description": "Task Description"
    }
    ```

2. To update a task, send a `PUT` request to `/tasks/:id` with the updated status. The put request should contain only the status field, like the following JSON body:
    ```json
    {
        "status": "completed"
    }
    ```

3. To delete a task, send a `DELETE` request to `/tasks/:id`.
