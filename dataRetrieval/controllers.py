
from service import return_regions 
# from models.dataRetrievalModel import dateRadar
from pymongo import MongoClient
from pykafka import KafkaClient
import urllib
import json
cl = MongoClient("mongodb+srv://orendaUser:"+urllib.parse.quote_plus('Orenda@123')+"@cluster0-389i7.mongodb.net/test?retryWrites=true&w=majority")
db = cl['dataRetrievalDB']
col=db.dataEntries

def produce(data,client,msg):
    Month=data['data']['Month']
    Day=data['data']['Day']
    Year=data['data']['Year']
    Radar=data['data']['Radar']
    userID=data['data']['userID']
    res=return_regions(Month,Day,Year,Radar)
    print(res)
    if(res=='success'):
        body = {"Month":Month,"Day":Day,"Year":Year,"Radar":Radar,'userID':userID}
        print(body)
        r= col.insert_one(body)
        with (client.topics['dataModellingConsumer1']).get_sync_producer() as producer:
            producer.produce(msg)

       
    # else:
    #     with (client.topics['apiGatewayConsumer']).get_sync_producer() as producer:
    #         producer.produce(msg)
      
    else:
        print('error')

