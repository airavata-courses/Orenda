const kafka = require('kafka-node')
const Producer = kafka.Producer
const Consumer = kafka.Consumer
const client = new kafka.KafkaClient({kafkaHost: 'kafka-service:9092'})
let config = require('./config');
    producer = new Producer(client);
    consumer = new Consumer(
        client,
        [{ topic: config.kafkaTopics.consumers.apiConsumer, partition: 0 }],
        {
          autoCommit: true,
          encoding: 'utf8',
          groupId: 'api-gateway'
        }
      ) 

module.exports={producer,consumer}