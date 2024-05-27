const express = require("express");
const app = express();
//require body paraser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//dotenv 
require('dotenv').config();
//connect database 
console.log(process.env.DATABASE);
const database = require("./config/database");
database.connect(process.env.DATABASE);
const port = process.env.PORT;
const routerApiV1 = require("./v1/router/index.router");
routerApiV1(app);

app.listen(port,() =>{
    console.log("SERVER IS RUNNING ON", port)
})