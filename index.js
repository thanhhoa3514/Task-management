const express = require("express");
const database = require("./config/database");
const cookieParser = require('cookie-parser');

const cors = require('cors');
const bodyParser = require('body-parser');
const routesApiVer1= require("./api/v1/routes/index.route");
require("dotenv").config();


const app = express();
const port = process.env.PORT;
database.connect();
app.use(cors());

app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());



routesApiVer1(app);

app.listen(port, () => {
    console.log(`Example app Ongoing on port ${port}`);
});