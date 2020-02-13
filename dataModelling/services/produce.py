
import matplotlib.pyplot as plt
import matplotlib
import pyart
import numpy as np
matplotlib.use('Agg')
from PIL import Image
import base64
import matplotlib.image as mpimg
import json
import pandas as pd
import pyimgur
from pykafka import KafkaClient

CLIENT_ID = "78adc2281c1c838"

im = pyimgur.Imgur(CLIENT_ID)
	
	

def produce(data,conn,client):
        Year=data['inputData']['Year']
        Month=data['inputData']['Month']
        Day=data['inputData']['Day']
        Radar=data['inputData']['Radar']
        numberOfPlots=1
        scans = conn.get_avail_scans(Year,Month,Day,Radar) # year, month and day
        results = conn.download(scans[numberOfPlots-1], 'templocation')

        fig = plt.figure(figsize=(16,12))
        for i,scan in enumerate(results.iter_success(),start=1):
                ax = fig.add_subplot(1,1,i)
                radar = scan.open_pyart()
                
                display = pyart.graph.RadarDisplay(radar)
                display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
                display.set_limits((-150, 150), (-150, 150), ax=ax)
        plotName=data["uid"]+'.png'
        plt.savefig(plotName)
        
        plt.close(fig)
        
        uploadImage = im.upload_image(plotName, title="Uploaded with PyImgur")
        link=str(uploadImage.link)
        # link=''
        body={  "inputData":data["inputData"],
                "outputData":link,
                "uid":data["uid"],
                "userID":data["userID"]
            }

        with (client.topics['dataAnalysisConsumerF']).get_sync_producer() as producer:
                        producer.produce(bytes(json.dumps(body),'utf-8'))
                

