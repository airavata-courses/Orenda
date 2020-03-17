var kafka = require("kafka-node");
Consumer = kafka.Consumer;
client = new kafka.KafkaClient({ kafkaHost: "kafka-service:9092" });

const consumerOptions = {
  autoCommit: true,
  encoding: "utf8",
  groupId: "session-management",
  protocol: ["roundrobin"],
  fromOffset: "latest"
};

const sessionCons = new ConsumerGroupStream(
  consumerOptions,
  "sessionManagementConsumerF"
);
const sessionApiCons = new ConsumerGroupStream(
  consumerOptions,
  "sessionManagementConsumerApiF"
);
const modelCons = new ConsumerGroupStream(
  consumerOptions,
  "dataModellingConsumerF"
);
const retriCons = new ConsumerGroupStream(
  consumerOptions,
  "dataRetrievalConsumerF"
);

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
  sessionCons,
  sessionApiCons,
  modelCons,
  retriCons,
  producer
};
