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
    if (message.topic == 'apiGatewayConsumer') {
      procData.sendAnalysis(message,message.topic)
      procData.sendRetrieval(message,message.topic)

        //store sessionID, email, input
        // let session = new Session(JSON.parse(message.value));
        // session.save(function (err, data) {
        //   if (err) return console.error(err);
        //   console.log("Saved Data: ",data);
        // });
      // console.log(message.value);
      // value = JSON.parse(message.value);
      // console.log(value);
    } else if (message.topic == 'dataRetrievalConsumer') {
      procData.storeInput(message,message.topic)

      //look for sessionID and put outputfile
    } else if (message.topic == 'dataAnalysisConsumer') {
      procData.storeOutput(message,message.topic)

      //look for email and render all results
     
  
    }
  });