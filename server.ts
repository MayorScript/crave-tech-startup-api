import express,{Request, Response} from 'express';
const cors = require('cors');
import http from 'http';
import socketIO from 'socket.io';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    transports:['polling'],
    cors:{
        origin: '*'
    }
});
io.on('connection', (socket) => {
    console.log('A user is connected');

    socket.on('message', (message) => {
        console.log(`message from ${socket.id} : ${message}`);
    })

    socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`);
    })
})

export {io};
const corsOptions = {
    origin: '*'
};

var multer = require("multer");
var upload = multer();

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(upload.array()); // Used to parse multipart/formdata
app.use(express.static("public"));

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
    .catch((err:any) => {
        console.log('Cannot connect to database', err);
        process.exit();
    })
//Routes
const router = require('./app/routes');
app.use('/api',router);
const PORT = 3001;

httpServer.listen(PORT, () => {
    console.log(`Application is running at port ${PORT}`);
})