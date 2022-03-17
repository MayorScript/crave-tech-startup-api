import {Request, Response} from 'express';
const db = require('../models');
const Phase = db.phases;
const Task = db.tasks;


exports.noOfPhases = (req:Request, res:Response) => {
      const startupId = req.query.startupId;
    Phase.find({startup: startupId})
      .then((data: any) => {
        res.send(data);
      })
      .catch((err: any) => {
        res.status(500).send({
          message: err.message ?? "Some error occurred while retrieving data.",
        });
      });
}
const noOfTotalTasks = (req:Request, res:Response) => {
    Task.find()
    .then((data: any) => {
        return data.length;
    })
    .catch((err: any) => {
          res.status(500).send({
          message: err.message ?? "Some error occurred while retrieving data.",
        });
    })
}
const noOfCompletedTasks = (req:Request, res:Response) => {
    Task.find({completed: true})
    .then((data: any) => {
        return data.length;
    })
    .catch((err: any) => {
          res.status(500).send({
          message: err.message ?? "Some error occurred while retrieving data.",
        });
    })
}
const noOfPendingTasks = (req:Request, res:Response) => {
    Task.find({completed: false})
    .then((data: any) => {
        return data.length;
    })
    .catch((err: any) => {
          res.status(500).send({
          message: err.message ?? "Some error occurred while retrieving data.",
        });
    })
}

exports.returnAllMetric = async (req:Request, res:Response) => {
    try{
        const totalTasks = 
        Task.find()
        .then((data: any) => {
            return data.length;
        })
        const pendingTasks = Task.find({completed: false})
        .then((data: any) => {
            return data.length;
        })
        const completedTasks = Task.find({completed: true})
        .then((data: any) => {
            return data.length;
        })
        const data = {
          completedTasks: await completedTasks,
          pendingTasks: await pendingTasks,
          allTasks: await totalTasks,
        };
        res.send(data);
    }catch(err:any){
        res.status(500).send({
          message: err.message ?? "Some error occurred while retrieving data.",
        });
    }
}