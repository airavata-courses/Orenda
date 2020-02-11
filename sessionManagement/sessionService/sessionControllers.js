var Session = require("./models/session_model");
const producer = require("../config/kafkaConfig").producer;

// exports.sendData = async
function sendApi(msg, topicName) {
topicName=''
  sendData(msg, topicName);
}

function sendRetrieval(msg, topicName) {
  sendData(msg, topicName);
}

function sendAnalysis(msg, topicName) {
  sendData(msg, topicName);
}

function sendData(msg, topicName) {
  msg = JSON.stringify(msg);

  let payloads = [
    {
      topic: topicName,
      messages: msg
    }
  ];
  producer.send(payloads, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log("sent");
    }
  });
}
module.exports = { sendApi, sendAnalysis, sendRetrieval };
