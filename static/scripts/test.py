from datetime import datetime

minute = int(datetime.now().strftime("%M"))

def check_expiration_min():
    exp_time = minute + 30 

    if exp_time > 59:
        exp_time -= 59
    
    
    
