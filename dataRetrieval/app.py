from flask import Flask
from controllers import produce 
from pykafka import KafkaClient
import json 

app = Flask(__name__)


client = KafkaClient(hosts="kafka-service:9092")
consumer =  client.topics['dataRetrievalConsumerF'].get_simple_consumer(consumer_group="test-consumer-group",
                                     auto_commit_enable=True)

for message in consumer:
    if message is not None:
        print("task received at dataRetrievalConsumerF")
        data=json.loads((message.value))
        produce(data,client)
        
       
       



