var kafka = require("kafka-node");
Consumer = kafka.Consumer;
client = new kafka.KafkaClient({kafkaHost: 'kafka-service:9092'});
consumer = new Consumer(
  client,
  [
    { topic: "sessionManagementConsumerF", partition: 0, offset: 0 },
    { topic: "sessionManagementConsumerApiF", partition: 0, offset: 0 },
    { topic: "dataModellingConsumerF", partition: 0, offset: 0 },
    { topic: "dataRetrievalConsumerF", partition: 0, offset: 0 },
    { topic: "dataAnalysisConsumerF", partition: 0, offset: 0 }
    
  ],
  {
    autoCommit: true,
    encoding: 'utf8',
    groupId: 'session-management'  }
);

Producer = kafka.Producer;
producer = new Producer(client);

module.exports = { consumer, producer };
