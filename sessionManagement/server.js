const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const consumer = require('./config/kafkaConfig').consumer;

dotenv.config();
InitiateMongoServer = require("./config/DBconfig");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

InitiateMongoServer();

consumer.on('message', function(message) {
    console.log('received at session from '+message.topic )
    if (message.topic == 'sessionManagementConsumerF') {
      procData.updateData(JSON.parse(message.value))

    } else if (message.topic == 'sessionManagementConsumerApiF') {
      procData.retrieveData(JSON.parse(message.value))

  } else if (message.topic == 'dataRetrievalConsumerF') {
    procData.createData(JSON.parse(message.value))

  }
  else if (message.topic == 'dataModellingConsumerF') {
    procData.updateState(JSON.parse(message.value))

  }
  });

