"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
const corsOptions = {
    origin: '*'
};
var multer = require("multer");
var upload = multer();
app.use(express_1.default.json()); //Used to parse JSON bodies
app.use(express_1.default.urlencoded()); //Parse URL-encoded bodies
app.use(upload.array()); // Used to parse multipart/formdata
app.use(express_1.default.static("public"));
app.use(cors(corsOptions));
//Connect to db
const db = require('./app/models');
db.mongoose
    .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    console.log('Connected to database');
})
    .catch((err) => {
    console.log('Cannot connect to database', err);
    process.exit();
});
//Routes
const router = require('./app/routes');
app.use('/api', router);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Application is running at port ${PORT}`);
});
