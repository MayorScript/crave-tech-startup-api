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
const db = require('../models');
const Phase = db.phases;
const Task = db.tasks;
exports.noOfPhases = (req, res) => {
    const startupId = req.query.startupId;
    Phase.find({ startup: startupId })
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        var _a;
        res.status(500).send({
            message: (_a = err.message) !== null && _a !== void 0 ? _a : "Some error occurred while retrieving data.",
        });
    });
};
const noOfTotalTasks = (req, res) => {
    Task.find()
        .then((data) => {
        return data.length;
    })
        .catch((err) => {
        var _a;
        res.status(500).send({
            message: (_a = err.message) !== null && _a !== void 0 ? _a : "Some error occurred while retrieving data.",
        });
    });
};
const noOfCompletedTasks = (req, res) => {
    Task.find({ completed: true })
        .then((data) => {
        return data.length;
    })
        .catch((err) => {
        var _a;
        res.status(500).send({
            message: (_a = err.message) !== null && _a !== void 0 ? _a : "Some error occurred while retrieving data.",
        });
    });
};
const noOfPendingTasks = (req, res) => {
    Task.find({ completed: false })
        .then((data) => {
        return data.length;
    })
        .catch((err) => {
        var _a;
        res.status(500).send({
            message: (_a = err.message) !== null && _a !== void 0 ? _a : "Some error occurred while retrieving data.",
        });
    });
};
exports.returnAllMetric = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const totalTasks = Task.find()
            .then((data) => {
            return data.length;
        });
        const pendingTasks = Task.find({ completed: false })
            .then((data) => {
            return data.length;
        });
        const completedTasks = Task.find({ completed: true })
            .then((data) => {
            return data.length;
        });
        const data = {
            completedTasks: yield completedTasks,
            pendingTasks: yield pendingTasks,
            allTasks: yield totalTasks,
        };
        res.send(data);
    }
    catch (err) {
        res.status(500).send({
            message: (_a = err.message) !== null && _a !== void 0 ? _a : "Some error occurred while retrieving data.",
        });
    }
});
