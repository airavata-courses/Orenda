var kafka = require('kafka-node');
let consumer = null;
const mongoose = require('mongoose');
var Session=require("./session_model");

//Connection with mongo

const dbPath =
  'mongodb+srv://' +
  process.env.DB_USER +
  ':' +
  process.env.DB_PASS +
  '@cluster0-389i7.mongodb.net/test?retryWrites=true&w=majority';

const InitiateMongoServer = async () => {
  try {
    mongoose.connect(dbPath, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'sessionDB'
    });
    console.log('Connected to session DB!');
  } catch (e) {
    console.log(e);
    throw e;
  }
};

var db=mongoose.connection;
//Consumer-Producer config
Consumer = kafka.Consumer;
client = new kafka.KafkaClient();
consumer = new Consumer(
  client,
  [
    { topic: 'SM1', partition: 0, offset: 0 },
    { topic: 'SM2', partition: 0, offset: 0 },
    { topic: 'SM3', partition: 0, offset: 0 }
  ],
  {
    autoCommit: false,
    fromOffset: true
  }
);

Producer = kafka.Producer;
producer = new Producer(client);

module.exports = { InitiateMongoServer, consumer, producer };
