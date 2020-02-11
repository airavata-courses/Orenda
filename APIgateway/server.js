const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const consumer=require('./config/kafkaConfig').consumer
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
// var topicsToCreate = [{
//   topic: 'apiGatewayConsumer2',
//   partitions: 1,
//   replicationFactor: 1}]
// },{
//   topic: 'dataRetrievalConsumer1',
//   partitions: 1,
//   replicationFactor: 1
// },{
//   topic: 'dataModellingConsumer1',
//   partitions: 1,
//   replicationFactor: 1
// },{
//   topic: 'dataAnalysisConsumer1',
//   partitions: 1,
//   replicationFactor: 1
// }]
// client.createTopics(topicsToCreate, (error, result) => {
//   console.log(result)
// });
app.listen(process.env.PORT, () => {
  console.log("gateway listening on port " + process.env.PORT);
});

consumer.on('message', (message)=>{
console.log(message,'consume')
  let data=JSON.parse(message.value)
  let uid=String(data['uid'])
  if(resID[uid]){resID[uid].send(data['data'])}

})
consumer.on('error', (error)=>{
  console.log('error', error)
})
