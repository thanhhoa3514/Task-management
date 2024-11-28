const express = require("express");
const database = require("./config/database");

const cors = require('cors');
const bodyParser = require('body-parser');
const routesApiVer1= require("./api/v1/routes/task.route");
require("dotenv").config();
// const Task= require("./models/task.model")

const app = express();
const port = process.env.PORT;
app.use(cors());

// parse application/json
app.use(bodyParser.json());

database.connect();


// routesApiVer1(app);

app.listen(port, () => {
    console.log(`Example app Ongoing on port ${port}`);
});