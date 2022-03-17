"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import db from '../models';
const db = require('../models');
const Startup = db.startups;
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Startup
    const startup = new Startup({
        name: req.body.name,
    });
    // Save Startup in the database
    startup
        .save(startup)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Startup."
        });
    });
};
// exports.findAllByPhase = (req:Request, res:Response) => {
//     const phaseId = req.query.phaseId;
//     //var condition = phaseId ? { phase: phaseId } : {};
//     Task.find({ phase: phaseId })
//       .then((data: any) => {
//         res.send(data);
//       })
//       .catch((err: any) => {
//         res.status(500).send({
//           message: err.message ?? "Some error occurred while retrieving tasks.",
//         });
//       });
// }
exports.findAll = (req, res) => {
    Startup.find()
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        var _a;
        res.status(500).send({
            message: (_a = err.message) !== null && _a !== void 0 ? _a : "Some error occurred while retrieving phases.",
        });
    });
};
exports.update = (req, res) => { };
exports.delete = (req, res) => { };
