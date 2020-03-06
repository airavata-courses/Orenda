from flask import Flask
from services.produce import produce
from pykafka import KafkaClient
import nexradaws
import json 

conn = nexradaws.NexradAwsInterface()
app = Flask(__name__)


client = KafkaClient()
consumer =  client.topics['dataModellingConsumerF'].get_simple_consumer(consumer_group="dataModellingConsumerF",
                                     auto_commit_enable=True)

for message in consumer:
    if message is not None:
        dataMsg=json.loads(message.value)
        produce(dataMsg,conn,client)
        consumer.commit_offsets()

if __name__ == "__main__":
 app.run(host='127.0.0.0', port=8080)



