const producer = require("../config/kafkaConfig").producer;

const uuidv1 = require("uuid/v1");
let config = require("../config/config");

async function session(res, req) {
  let uid = uuidv1();
  msg = req.body;
  id = msg["userID"];

  let data = { uid: uid, userID: id };
  let res = await produce(data, config.kafkaTopics.producers.session);
  if (res != "error") {
    res.sendStataus(200);
  }
  else{
    resID[uid] = res;
  }

}
async function task(res, req) {
  let uid = uuidv1();
  msg = req.body;
  id = msg["userID"];
  let data = { inputData: msg["inputData"], uid: uid, userID: id };
  let res = await produce(
    data,
    config.kafkaTopics.producers.sessiondataRetrieval
  );
  if (res != "error") {
    res.sendStataus(200);
  }
  else{
      res.sendStataus(400)
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

module.exports = { session, task };
