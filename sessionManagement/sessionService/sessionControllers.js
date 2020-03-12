var Session = require("./models/session_model");
const producer = require("../config/kafkaConfig").producer;

async function createData(data) {
  try {
    session = new Session(data);
    session.save();
    return 200;
  } catch (err) {
    console.log(err.message);
  }
}
async function updateState(data) {
  try {
    filter = { uid: data["uid"] };
    update = { taskState: "executing" };
  
    Session.updateOne(filter, update, { new: true })
      .then(data => {
        return data;
      })
      .catch(error => {
        throw new Error(error);
      });
    
  } catch (err) {
    console.log(err.message);
  }
}

async function updateData(data) {
  try {
    filter = { uid: data["uid"] };
    update = { outputData: data["outputData"], taskState: "executed" };

    Session.updateOne(filter, update, { new: true })
      .then(data => {
        return data;
      })
      .catch(error => {
        throw new Error(error);
      });

  
  } catch (err) {
    console.log(err.message);
  }
}

async function retrieveData(data) {
  let sessions = Session.find({ userID: data["userID"] }, function(
    err,
    documents
  ) {
    data = { sessions: documents, userID: data["userID"], uid: data["uid"] };
    sendData(data, "apiGatewayConsumerF");
  });
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
    }
  });
}
module.exports = { updateData, retrieveData, createData, updateState };
