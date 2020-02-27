const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = express.Router();
var kafka = require('kafka-node')
global.resID={}
const client = new kafka.KafkaClient();
const admin = new kafka.Admin(client);
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

require("./routing/routes")(app);
var topicsToCreate = [{
  topic: 'apiGatewayConsumerF',
  partitions: 1,
  replicationFactor: 1
},{
  topic: 'dataRetrievalConsumerF',
  partitions: 1,
  replicationFactor: 1
},{
  topic: 'dataModellingConsumerF',
  partitions: 1,
  replicationFactor: 1
},{
  topic: 'dataAnalysisConsumerF',
  partitions: 1,
  replicationFactor: 1
},{
  topic: 'sessionManagementConsumerF',
  partitions: 1,
  replicationFactor: 1
},{
  topic: 'sessionManagementConsumerApiF',
  partitions: 1,
  replicationFactor: 1
}]
client.createTopics(topicsToCreate, (error, result) => {
  // console.log(result)
});
const consumer=require('./config/kafkaConfig').consumer

app.listen(process.env.PORT, () => {
  console.log("gateway listening on port " + process.env.PORT);
});

consumer.on('message', (message)=>{
  let data=JSON.parse(message.value)

  let uid=String(data['uid'])

  if(resID[uid] && resID[uid]!=null){

    ob=resID[uid]
    resID[uid]=null
    delete resID["uid"];

    ob.send(data)
  }



})
consumer.on('error', (error)=>{
  console.log('error', error)
})
