const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
let config = require("./config/config");

global.resID={}
dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
require("./routing/routes")(app);

app.listen(config.PORT, () => {
  console.log("gateway listening on port " + config.PORT);
});

const consumer=require('./config/kafkaConfig').consumer
 
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
module.exports = app;