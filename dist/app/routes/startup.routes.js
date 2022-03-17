"use strict";
const startupRoute = require("express").Router();
const startupController = require("../controllers/startup.controller");
startupRoute
    .post("/startup/create", startupController.create)
    .get("/startups", startupController.findAll);
module.exports = startupRoute;
