from flask import Flask
from controllers import produce 

from pykafka import KafkaClient
import json 

app = Flask(__name__)


client = KafkaClient()
consumer =  client.topics['dataRetrievalConsumerF'].get_simple_consumer(consumer_group="dataModellingConsumerF",
                                     auto_commit_enable=True)

for message in consumer:
    if message is not None:
        data=json.loads((message.value))
        produce(data,client)
        
       
       



