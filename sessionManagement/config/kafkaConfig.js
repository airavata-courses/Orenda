var kafka = require("kafka-node");
// const Consumer = kafka.Consumer;
const ConsumerGroup = kafka.ConsumerGroup
client = new kafka.KafkaClient({ kafkaHost: "kafka-service:9092" });

const consumerOptions = {
  kafkaHost: 'kafka-service:9092',
  autoCommit: true,
  encoding: "utf8",
  groupId: "session-management",
  protocol: ["roundrobin"],
  fromOffset: "latest"
};

const consumer = new ConsumerGroup(consumerOptions, [
  "sessionManagementConsumerF",
  "sessionManagementConsumerApiF",
  "dataModellingConsumerF",
  "dataRetrievalConsumerF"
]);

// consumer = new consumer(
//   client,
//   [
//     { topic: "sessionManagementConsumerF" },
//     { topic: "sessionManagementConsumerApiF" },
//     { topic: "dataModellingConsumerF" },
//     { topic: "dataRetrievalConsumerF" },
//     { topic: "dataAnalysisConsumerF" }

//   ],
//   {
//     autoCommit: true,
//     encoding: 'utf8',
//     groupId: 'session-management'  }
// );

Producer = kafka.Producer;
producer = new Producer(client);

module.exports = {
  consumer,
  producer
};
