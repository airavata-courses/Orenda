var kafka = require("kafka-node");
Consumer = kafka.Consumer;
client = new kafka.KafkaClient(kafkaHost: 'kafkaService:9092');
consumer = new Consumer(
  client,
  [
    { topic: "sessionManagementConsumerF", partition: 0, offset: 0 },
    { topic: "sessionManagementConsumerApiF", partition: 0, offset: 0 },
    { topic: "dataModellingConsumerF", partition: 0, offset: 0 },
    { topic: "dataRetrievalConsumerF", partition: 0, offset: 0 }
  ],
  {
    autoCommit: true
  }
);

Producer = kafka.Producer;
producer = new Producer(client);

module.exports = { consumer, producer };
