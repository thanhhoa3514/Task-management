const express = require("express");
const database = require("./config/database");
const bodyParser = require('body-parser');

require("dotenv").config();
// const Task= require("./models/task.model")

database.connect();
const app = express();

const port = process.env.PORT;

// parse application/json
app.use(bodyParser.json());





app.listen(port, () => {
    console.log(`Example app Ongoing on port ${port}`);
});