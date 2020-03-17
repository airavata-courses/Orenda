const kafka = require("kafka-node");
const Producer = kafka.Producer;
// const Consumer = kafka.Consumer;
const ConsumerGroup = kafka.ConsumerGroup
const client = new kafka.KafkaClient({ kafkaHost: "kafka-service:9092" });
// let config = require("./config");
producer = new Producer(client);
// consumer = new Consumer(
//     client,
//     [{ topic: config.kafkaTopics.consumers.apiConsumer }],
//     {
//       autoCommit: true,
//       encoding: 'utf8',
//       groupId: 'api-gateway'
//     }
//   )
const consumerOptions = {
  kafkaHost: 'kafka-service:9092',
  autoCommit: true,
  encoding: "utf8",
  groupId: "api-gateway",
  protocol: ["roundrobin"],
  fromOffset: "latest"
};
const consumer = new ConsumerGroup(
  consumerOptions,
  "sessionManagementConsumerF"
);

module.exports = { producer, consumer };
