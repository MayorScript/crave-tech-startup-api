"use strict";
const phaseRoute = require("express").Router();
const phaseController = require("../controllers/phase.controller");
phaseRoute
    .post("/phase/create", phaseController.create)
    .get("/phases", phaseController.findAll);
module.exports = phaseRoute;
