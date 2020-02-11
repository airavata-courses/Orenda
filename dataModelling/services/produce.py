
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

from kafka import KafkaProducer
producer = KafkaProducer(bootstrap_servers='localhost:9092')
def produce(data,conn):
        Year=data['data']['Year']
        Month=data['data']['Month']
        Day=data['data']['Day']
        Radar=data['data']['Radar']
        scans = conn.get_avail_scans(Year,Month,Day,Radar) # year, month and day
        results = conn.download(scans[0], 'templocation')

        fig = plt.figure(figsize=(16,12))
        for i,scan in enumerate(results.iter_success(),start=1):
                ax = fig.add_subplot(2,2,i)
                radar = scan.open_pyart()
                
                display = pyart.graph.RadarDisplay(radar)
                display.plot('reflectivity',0,ax=ax,title="{} {}".format(scan.radar_id,scan.scan_time))
                display.set_limits((-150, 150), (-150, 150), ax=ax)
        fig.canvas.draw ( )
        w,h = fig.canvas.get_width_height()
        buf = np.frombuffer ( fig.canvas.tostring_argb(), dtype=np.uint8 )
        buf.shape = ( w, h,4 )
        buf = np.roll ( buf, 3, axis = 2 )
        w, h, d = buf.shape
        res=Image.frombytes( "RGBA", ( w ,h ), buf.tostring( ) )
        res=res.resize((960,720),Image.ANTIALIAS)
        # body={
        #         "resultPlot":buf.tolist(),
        #         "uid":data["uid"],
        #         "userID":data["userID"]
        #     }
        body='{"resultPlot":"0","uid":"8","userID":"2"}'
        plt.close(fig)
        print(json.dumps(body).encode('utf-8'))
        producer.send('dataAnalysisConsumer1', json.dumps(body).encode('utf-8'))
        
            

