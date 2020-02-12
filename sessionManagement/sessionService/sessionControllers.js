var Session = require("./models/session_model");
const producer = require("../config/kafkaConfig").producer;

async function createData(msg) {
  let data = JSON.parse(msg.value);
  try {
    session = new Session(data);
    console.log(data);

    await session.save();
  } catch (err) {
    console.log(err.message);
  }
  
}
async function updateState(msg) {
  let data = JSON.parse(msg.value);
  try {
 
    console.log(data);
    filter={"uid":data["uid"]}
    update={"taskState":"executing"}
    let session = await Session.updateOne(filter, update,{new:true});

    
  } catch (err) {
    console.log(err.message);
  }
  
}

 async function updateData(msg) {
  let data = JSON.parse(msg.value);
  try {
    console.log(data);
    filter={"uid":data["uid"]}
    update={"outputData":data["outputData"],"taskState":"executed"}
    let session = await Session.updateOne(filter, update,{new:true});

   
    

  } catch (err) {
    console.log(err.message);
  }
}

async function retrieveData(msg) {
  let data = JSON.parse(msg.value);
  console.log('retrieved');
  let sessions= Session.find({'userID': data['userID']}, function(err, documents) {
    
    data={"sessions":documents,
      "userID":data['userID'],
      "uid":data['uid']

      
    }
    console.log('retrieved',data);
    sendData(data, 'apiGatewayConsumerF');
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
    } else {
      console.log("sent new");
    }
  });
}
module.exports = { updateData, retrieveData, createData,updateState };
