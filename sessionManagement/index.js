const consumer = require('./connection').consumer;
const producer = require('./connection').producer;
var Session = require("./session_model");
InitiateMongoServer=require('./connection').InitiateMongoServer;

InitiateMongoServer();
consumer.on('message', function(message) {
  if (message.topic == 'SM1') {
      //store sessionID, email, input
      let session = new Session(JSON.parse(message.value));
      session.save(function (err, data) {
        if (err) return console.error(err);
        console.log("Saved Data: ",data);
      });
    // console.log(message.value);
    // value = JSON.parse(message.value);
    // console.log(value);
  } else if (message.topic == 'SM2') {
    //look for sessionID and put outputfile
  } else if (message.topic == 'SM3') {
    //look for email and render all results
    let record= Session.find({
        email
    });
    if(record)
    {
        let payload=[{
            topic: "apiGatewayConsumer",
            message: record
            
        }]
      producer.send("ready", function(error,data) {
          if (error) {
            console.log(error)
        }

    //retrieve inputID, outputID for some username
});  
    }

    
  }
});

