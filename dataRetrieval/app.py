from flask import Flask
from controllers import produce 

from pykafka import KafkaClient
import json 

app = Flask(__name__)


client = KafkaClient()
consumer =  client.topics['dataRetrievalConsumer1'].get_simple_consumer()
for message in consumer:
    if message is not None:
        data=json.loads((message.value))
        print(data)
        produce(data,client,message.value)




