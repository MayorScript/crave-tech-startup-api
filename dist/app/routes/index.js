"use strict";
const router = require("express").Router();
const metricController = require("../controllers/metric.controller");
router
    .get('/metrics', metricController.returnAllMetric)
    .use(require("./phase.routes"))
    .use(require("./task.routes"));
module.exports = router;
