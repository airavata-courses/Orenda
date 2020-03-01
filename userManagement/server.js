const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
let config =require('./config/config');

dotenv.config();
InitiateMongoServer=require("./config/DBconn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require("./userService/routes")(app);
InitiateMongoServer();


app.listen(config.PORT, () => {
  console.log("gateway listening on port " + config.PORT);
});
