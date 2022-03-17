"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import db from '../models';
const db = require('../models');
const Task = db.tasks;
const Phase = db.phases;
exports.create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request
    if (!req.body.title && !req.body.phase) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const task = new Task({
            title: req.body.title,
            phase: req.body.phase
        });
        const data = yield task.save(task);
        yield Phase.findByIdAndUpdate(req.body.phase, { $push: { tasks: data.id } }, { new: true, useFindAndModify: false });
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    }
});
exports.updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate request
    if (!req.query.taskId) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    try {
        const taskID = req.query.taskId;
        //Pull current task and check if it's completed or not
        let setTaskStatus = null;
        const currentTask = yield Task.findById(taskID);
        if (currentTask.completed == true) {
            setTaskStatus = false;
        }
        else {
            setTaskStatus = true;
        }
        const data = yield Task.findByIdAndUpdate(taskID, { completed: setTaskStatus }, { useFindAndModify: false });
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    }
    //Update task in phase collection
});
exports.delete = (req, res) => { };
