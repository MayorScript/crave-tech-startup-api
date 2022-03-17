import {Request, Response} from 'express';
//import db from '../models';
const db = require('../models');
const Task = db.tasks;
const Phase = db.phases;

exports.create = async (req:Request, res:Response) => {
// Validate request
  if (!req.body.title && !req.body.phase) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  try{
    const task =  new Task({
    title: req.body.title,
    phase: req.body.phase
    });
  const data = await task.save(task);
   await Phase.findByIdAndUpdate(
      req.body.phase,
      {$push: {tasks: data.id}},
      { new: true, useFindAndModify: false },
    );
    res.send(data);
  }catch(err:any){
        res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
  }
}
exports.updateTask = async (req:Request, res:Response) => {
  // Validate request
  if (!req.query.taskId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  try{
      const taskID = req.query.taskId;
      //Pull current task and check if it's completed or not
      let setTaskStatus = null;
      const currentTask = await Task.findById(taskID);
      if(currentTask.completed == true){
          setTaskStatus = false
      }else{
        setTaskStatus = true;
      }
      const data = await Task.findByIdAndUpdate(
      taskID,
      {completed: setTaskStatus},
      {useFindAndModify: false },
    );
    res.send(data);
  }catch(err:any){
        res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Task."
      });
  }
  //Update task in phase collection
}
exports.delete = (req:Request, res:Response) => {}