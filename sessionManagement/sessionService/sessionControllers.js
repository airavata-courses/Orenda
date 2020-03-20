var Session = require("./models/session_model");
// const producer = require("../config/kafkaConfig").producer;

async function createData(data) {
  try {
    session = new Session(data);
    console.log("data created");
    session.save();
    return 200;
  } catch (err) {
    console.log(err.message);
  }
}
async function updateState(data) {
  try {
    filter = { uid: data["uid"] };
    if (data == "noScans") update = { taskState: "error" };
    else update = { taskState: "executing" };

    Session.updateOne(filter, update, { new: true });

    console.log("state Updated");
    return 200;
  } catch (err) {
    console.log("err");
    console.log(err.message);
  }
}

async function updateData(data) {
  try {
    filter = { uid: data["uid"] };
    update = { outputData: data["outputData"], taskState: "executed" };

    Session.updateOne(filter, update, { new: true });
    console.log("data Updated");
    return 200;
  } catch (err) {
    console.log(err.message);
  }
}

async function retrieveData(req, res) {
  console.log("/session");
  data = req.body;
  console.log(req.body);
  let documents = await Session.find({ userID: data["userID"] });
  data = { sessions: documents, userID: data["userID"], uid: data["uid"] };
  res.send(data);
  // sendData(data, "apiGatewayConsumerF");
}

// function sendData(msg, topicName) {
//   msg = JSON.stringify(msg);
//   let payloads = [
//     {
//       topic: topicName,
//       messages: msg
//     }
//   ];
//   producer.send(payloads, (error, data) => {
//     if (error) {
//       console.log(error);
//     }
//   });
// }
module.exports = { updateData, retrieveData, createData, updateState };
