import nexradaws
conn = nexradaws.NexradAwsInterface()

def return_regions(month,day,year,radar):
        # date_json_string='02-07-2020-KABR'
        # month, day, year, radar = date_json_string.split("-")[0], date_json_string.split("-")[1], date_json_string.split("-")[2], date_json_string.split("-")[3]
        # radars = conn.get_avail_radar(str(year), str(month).zfill(2), str(day).zfill(2)) # year, month and day
    try:
        radars = conn.get_avail_radars(year,month,day) # year, month and day
        if radars:
            if (radar in radars):
                return("success")
            else: 
                return("error")
        return('error')
    except:
        return('error')
    except TypeError:
        return('error')

        

