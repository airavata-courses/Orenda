import matplotlib.pyplot as plt
import pyart
import nexradaws

conn = nexradaws.NexradAwsInterface()

def return_regions(date_json_string):
    month, day, year, radar = date_json_string.split("-")[0], date_json_string.split("-")[1], date_json_string.split("-")[2], date_json_string.split("-")[3]
    radars = conn.get_avail_radars(str(year), str(month).zfill(2), str(day).zfill(2)) # year, month and day
#     print(radars)
    if (radar in radars):
        print("success")
    else: 
        print("error")
