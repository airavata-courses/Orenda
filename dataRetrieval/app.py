from flask import Flask
from controllers import produce 
from pykafka import KafkaClient
import json 

app = Flask(__name__)


client = KafkaClient(hosts="kafka-service:9092")
consumer =  client.topics['dataRetrievalConsumerF'].get_balanced_consumer(consumer_group="data-retrieval",
                                     auto_commit_enable=True,zookeeper_connect="zoo1:2181")

for message in consumer:
    if message is not None:
        print("task received at dataRetrievalConsumerF")
        print(message)
        data=json.loads((message.value))
        produce(data,client)
        
       
       



