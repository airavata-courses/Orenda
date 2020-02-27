const kafka = require('kafka-node')
const Producer = kafka.Producer
const Consumer = kafka.Consumer
const client = new kafka.KafkaClient()

    producer = new Producer(client);
    consumer = new Consumer(
        client,
        [{ topic: 'apiGatewayConsumerF', offset:0, partition: 0 }],
        {
          autoCommit: true,
          encoding: 'utf8',
          fromOffset: true
        }
      ) 

module.exports={producer,consumer}