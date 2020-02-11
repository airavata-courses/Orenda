var kafka = require('kafka-node');
Consumer = kafka.Consumer;
client = new kafka.KafkaClient();
consumer = new Consumer(
  client,
  [
    { topic: 'sessionManagementConsumer', partition: 0, offset: 0 }
  ],
  {
    autoCommit: false,
    fromOffset: true
  }
);

Producer = kafka.Producer;
producer = new Producer(client);

module.exports = {  consumer, producer };
