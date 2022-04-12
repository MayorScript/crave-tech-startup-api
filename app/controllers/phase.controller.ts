import {Request, Response} from 'express';
import {io} from "../../server";
//import db from '../models';
const db = require('../models');
const Phase = db.phases;

exports.create = (req:Request, res:Response) => {
         // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Phase
  const phase = new Phase({
    title: req.body.title,
    completed: req.body.completed,
  });
  // Save Phase in the database
  phase
    .save(phase)
    .then((data:any) => {
        io.emit('phase-added', data)
      res.send(data);
    })
    .catch((err:any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the phase."
      });
    });
}
exports.findAll = async (req:Request, res:Response) => {
    try{
      const data = await Phase.find().populate("tasks")
      res.send(data);
    }catch(err:any){
        res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving phases."
      });
  }
}
exports.update = (req:Request, res:Response) => {}
exports.delete = (req:Request, res:Response) => {}