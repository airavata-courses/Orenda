const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();

dotenv.config();
InitiateMongoServer=require("./config/DBconn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require("./userService/routes")(app);
InitiateMongoServer();
// global error handler

app.listen(process.env.PORT, () => {
  console.log("gateway listening on port " + process.env.PORT);
});
