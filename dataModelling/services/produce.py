
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
from kafka import KafkaProducer
producer = KafkaProducer(bootstrap_servers='localhost:9092')

CLIENT_ID = "78adc2281c1c838"

im = pyimgur.Imgur(CLIENT_ID)
	
	

def produce(data,conn):
        Year=data['inputData']['Year']
        Month=data['inputData']['Month']
        Day=data['inputData']['Day']
        Radar=data['inputData']['Radar']
        scans = conn.get_avail_scans(Year,Month,Day,Radar) # year, month and day
        results = conn.download(scans[0], 'templocation')

        fig = plt.figure(figsize=(16,12))
        for i,scan in enumerate(results.iter_success(),start=1):
                ax = fig.add_subplot(2,2,i)
                radar = scan.open_pyart()
                
                display = pyart.graph.RadarDisplay(radar)
                display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
                display.set_limits((-150, 150), (-150, 150), ax=ax)
        plotName=data["uid"]+'.png'
        plt.savefig(plotName)
        
        plt.close(fig)
        
        uploadImage = im.upload_image(plotName, title="Uploaded with PyImgur")
        link=str(uploadImage.link)
        # fig.canvas.draw ( )
        # w,h = fig.canvas.get_width_height()
        # buf = np.frombuffer ( fig.canvas.tostring_argb(), dtype=np.uint8 )
        # buf.shape = ( w, h,4 )
        # buf = np.roll ( buf, 3, axis = 2 )
        # w, h, d = buf.shape
        # res=Image.frombytes( "RGBA", ( w ,h ), buf.tostring( ) )
        # res=res.resize((960,720),Image.ANTIALIAS)
        body={  "inputData":data["inputData"],
                "outputData":link,
                "uid":data["uid"],
                "userID":data["userID"]
            }
        # body='{"resultPlot":"0","uid":"8","userID":"2"}'
        
        print(bytes(json.dumps(body),'utf-8'))
        producer.send('dataAnalysisConsumerF', bytes(json.dumps(body),'utf-8'))
        
            

