"use strict";
const taskRoute = require("express").Router();
const taskController = require("../controllers/task.controller");
taskRoute
    .post("/task/create", taskController.create)
    .put("/task/update/:taskId?", taskController.updateTask);
module.exports = taskRoute;
