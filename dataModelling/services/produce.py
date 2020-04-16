
import matplotlib.pyplot as plt
import matplotlib
import matplotlib.image as mpimg
import json
import numpy as np
import pyimgur
from pykafka import KafkaClient
from metpy.cbook import get_test_data
from metpy.io import Level2File
from metpy.plots import add_metpy_logo, add_timestamp
CLIENT_ID = "78adc2281c1c838"

im = pyimgur.Imgur(CLIENT_ID)
	
	

def produce(data,conn,client):
        Year=data['inputData']['Year']
        Month=data['inputData']['Month']
        Day=data['inputData']['Day']
        Radar=data['inputData']['Radar']
        uid=data['uid']
        inputData=data['inputData']
        userID=data["userID"]

         
        numberOfPlots=1
        scans = conn.get_avail_scans(Year,Month,Day,Radar) # year, month and day
        results = conn.download(scans[numberOfPlots-1], 'templocation')
      
        for i,scan in enumerate(results.iter_success(),start=1):

                sweep = 0
                name = scan.open()
                f = Level2File(name)
                # First item in ray is header, which has azimuth angle
                az = np.array([ray[0].az_angle for ray in f.sweeps[sweep]])

                # 5th item is a dict mapping a var name (byte string) to a tuple
                # of (header, data array)
                ref_hdr = f.sweeps[sweep][0][4][b'REF'][0]
                ref_range = np.arange(ref_hdr.num_gates) * ref_hdr.gate_width + ref_hdr.first_gate
                ref = np.array([ray[4][b'REF'][1] for ray in f.sweeps[sweep]])

                rho_hdr = f.sweeps[sweep][0][4][b'RHO'][0]
                rho_range = (np.arange(rho_hdr.num_gates + 1) - 0.5) * rho_hdr.gate_width + rho_hdr.first_gate
                rho = np.array([ray[4][b'RHO'][1] for ray in f.sweeps[sweep]])

                fig, axes = plt.subplots(1, 2, figsize=(15, 8))
                add_metpy_logo(fig, 190, 85, size='large')
                for var_data, var_range, ax in zip((ref, rho), (ref_range, rho_range), axes):
                # Turn into an array, then mask
                        data = np.ma.array(var_data)
                        data[np.isnan(data)] = np.ma.masked

                        # Convert az,range to x,y
                        xlocs = var_range * np.sin(np.deg2rad(az[:, np.newaxis]))
                        ylocs = var_range * np.cos(np.deg2rad(az[:, np.newaxis]))

                        # Plot the data
                        ax.pcolormesh(xlocs, ylocs, data, cmap='viridis')
                        ax.set_aspect('equal', 'datalim')
                        ax.set_xlim(-40, 20)
                        ax.set_ylim(-30, 30)
                        add_timestamp(ax, f.dt, y=0.02, high_contrast=True)

                

                pltName='images/'+str(uid+str(i)+'.png')
                plt.savefig(pltName)
                plt.close(fig)
                uploadImage = im.upload_image(pltName, title="Uploaded with PyImgur")
                link=str(uploadImage.link)
               
                body={  "inputData":inputData,
                        "outputData":link,
                        "uid":uid,
                        "userID":userID
                }
                
                with (client.topics['dataAnalysisConsumerF']).get_sync_producer() as producer:
                                print("task sent to dataAnalysisConsumerF")
                                producer.produce(bytes(json.dumps(body),'utf-8'))
                

