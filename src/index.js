/* Module Imports */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieParser = require('cookie-parser');

/* MongoDB Connection */
const username = "admin"
const password = "TK8e3chd5eTWeBbj"
const cluster = "firstapp.bcvcknj"
const dbname = ""; // Defaults to "test" if left blank

const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;

/* Mongoose Setup and Connection */
const mongoose = require('mongoose');
const mongoose_settings = {useNewUrlParser: true};

mongoose.connect(uri, mongoose_settings);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error: "));
db.once("open", () => {
    console.log("Connected successfully to MongoDB");
});

/* Views Setup */
app.set('view engine', 'pug'); // Allows for the use of pug
app.set('views', './views');
app.use('/css', express.static('css')); // Allows for the use of css

/* Middleware Setup */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
app.use(upload.array());
app.use(cookieParser());
app.use(session({ secret: "Dragon" }));

/* Routing Setup */
const homePage = require('./routes/homePage.js');
app.use('/', homePage);
const login = require('./routes/login.js');
app.use('/login', login);

// Error 404 **OTHER ROUTES MUST COME BEFORE THIS**
app.get('*', (req, res) => {
    res.send("This is not a real URL");
});

/* Socket.io Initialization */

/* PORT Setup */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Application listening on port: ${port}`);
});