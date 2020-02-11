const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const consumer = require('./config/kafkaConfig').consumer;
const procData= require('./sessionService/sessionControllers')

dotenv.config();
InitiateMongoServer=require("./config/DBconfig");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



app.listen(process.env.PORT, () => {
  console.log("gateway listening on port " + process.env.PORT);
});
InitiateMongoServer();

consumer.on('message', function(message) {
  
    if (message.topic == 'sessionManagementConsumerF') {
      procData.storeData(message)
  
    } else if (message.topic == 'sessionManagementConsumerApiF') {
      procData.retrieveData(message)

    }
  });