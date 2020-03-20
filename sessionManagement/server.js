const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const consumer = require("./config/kafkaConfig").consumer;

const procData = require("./sessionService/sessionControllers");

dotenv.config();
InitiateMongoServer = require("./config/DBconfig");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require("./sessionService/routes")(app);

InitiateMongoServer();

app.listen(5001, () => {
  console.log("session listening on port 5001");
});
consumer.on("message", function(message) {
  console.log("received at session from " + message.topic + message.value);
  if (message.topic == "sessionManagementConsumerF") {
    let data=JSON.parse(message.value)
    if (taskState in data) {
      procData.updateState(JSON.parse(message.value));
    } else {
      procData.updateData(JSON.parse(message.value));
    }
  } else if (message.topic == "sessionManagementConsumerApiF") {
    procData.retrieveData(JSON.parse(message.value));
  } else if (message.topic == "dataRetrievalConsumerF") {
    procData.createData(JSON.parse(message.value));
  } else if (message.topic == "dataModellingConsumerF") {
    procData.updateState(JSON.parse(message.value));
  }
});
