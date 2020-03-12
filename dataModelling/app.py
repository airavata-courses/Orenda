from flask import Flask
from services.produce import produce
from pykafka import KafkaClient
import nexradaws
import json 

conn = nexradaws.NexradAwsInterface()
app = Flask(__name__)


client = KafkaClient(hosts="kafka-service:9092")
consumer =  client.topics['dataModellingConsumerF'].get_simple_consumer(consumer_group="test-consumer-group",
                                     auto_commit_enable=True)

for message in consumer:
    print("task received at dataModellingConsumerF")
    if message is not None:
        dataMsg=json.loads(message.value)
        produce(dataMsg,conn,client)
        consumer.commit_offsets()