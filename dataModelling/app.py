from flask import Flask
from services.produce import produce
from kafka import KafkaConsumer
import nexradaws
import json 

conn = nexradaws.NexradAwsInterface()
app = Flask(__name__)

print('done')
consumer = KafkaConsumer('dataModellingConsumer1')

for message in consumer:
    if message is not None:
        dataMsg=json.loads(message.value)
        print(dataMsg,message.topic)
        if(dataMsg['userID']):
            produce(dataMsg,conn)

if __name__ == "__main__":
 app.run(host='127.0.0.0', port=8080)



