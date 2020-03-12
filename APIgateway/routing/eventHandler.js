const producer = require("../config/kafkaConfig").producer;

const uuidv1 = require("uuid/v1");
let config = require("../config/config");

async function serverStarted(req, res) {
return res.send("Server Started")

}

async function session(req, res) {

  let uid = uuidv1();
  let msg = req.body;
  let id = msg["userID"];

  let data = { uid: uid, userID: id };
  let result = await produce(data, config.kafkaTopics.producers.session);
  if (result == "error") {
    res.sendStatus(400);
    
  } else {
    resID[uid] = res;
  }
}
async function task(req, res) {
 
  let uid = uuidv1();
  let  msg = req.body;
  
  let id = msg["userID"];
  let data = { inputData: msg["inputData"], uid: uid, userID: id };
 
  let result = await produce(
    data,
    config.kafkaTopics.producers.dataRetrieval
  );
  if (result != "error") {
    res.sendStatus(200);
    console.log('task submitted to' +config.kafkaTopics.producers.dataRetrieval)
  } else {
    res.sendStatus(400);
  }
}

async function produce(msg, topic) {
  msg = JSON.stringify(msg);

  let payloads = [
    {
      topic: topic,
      messages: msg
    }
  ];
  producer.send(payloads, (error, data) => {
    if (error) {
      console.log(error);
      return "error";
    } else {
      return data;
    }
  });
}

module.exports = { session, task ,serverStarted};
