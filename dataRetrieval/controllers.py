
from service import return_regions 
import urllib
import json


def produce(data,client):
    Month=data['inputData']['Month']
    Day=data['inputData']['Day']
    Year=data['inputData']['Year']
    Radar=data['inputData']['Radar']
    userID=data['userID']
    uid=data['uid']
    res=return_regions(Month,Day,Year,Radar)
    if(res=='success'):
        body = {"inputData":{"Month":Month,"Day":Day,"Year":Year,"Radar":Radar},"userID":userID,"uid":uid}
  
        with (client.topics['dataModellingConsumerF']).get_sync_producer() as producer:
            print("task sent to dataModellingConsumerF")
            producer.produce((bytes(json.dumps(body),'utf-8')))
    else:
        with (client.topics['sessionManagementConsumerF']).get_sync_producer() as producer:
            producer.produce("noScans")


    

