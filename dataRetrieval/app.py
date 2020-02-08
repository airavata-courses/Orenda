from flask import Flask
import os
from flask import Flask
from flask_pymongo import PyMongo
import urllib
from kafka import KafkaConsumer
consumer = KafkaConsumer('my_favorite_topic')
for msg in consumer:
  print (msg)

from flask_kafka import FlaskKafka
# create the flask object
app = Flask(__name__)
# add mongo url to flask config, so that flask_pymongo can use it to make connection
app.config['MONGO_URI'] = 'mongodb+srv://orendaUser:'+urllib.parse.quote_plus('Orenda@123')+'@cluster0-389i7.mongodb.net/test?retryWrites=true&w=majority/orendaDB'
mongo = PyMongo(app)



if __name__ == "__main__":
  app.run()