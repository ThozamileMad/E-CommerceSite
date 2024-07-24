from datetime import datetime, timedelta

current_date = datetime.now()
time_delta = timedelta(minutes=30)

expiry_date = current_date + time_delta

print(current_date > expiry_date)




    

    
