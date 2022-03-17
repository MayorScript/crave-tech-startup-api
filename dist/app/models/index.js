"use strict";
const dbConfig = require('../config/db-config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {
    mongoose: mongoose,
    url: dbConfig.url,
    tasks: require('./task.model')(mongoose),
    phases: require('./phase.model')(mongoose),
};
module.exports = db;
