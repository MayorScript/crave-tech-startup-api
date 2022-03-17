import express,{Request, Response} from 'express';
const cors = require('cors');

const app = express();
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

app.listen(PORT, () => {
    console.log(`Application is running at port ${PORT}`);
})