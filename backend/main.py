import asyncio
import json
import time
from kasa import Discover
from routs import *
import os 
from helpers import parse_sensor_data

if __name__=="__main__":

    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_path = dir_path + "/plik.json"
    with open(file_path, 'r') as file:
        data = json.load(file)
    parse_sensor_data(data)
    try:
        app.run()
    except Exception as e:
        print(f"An error occurred: {e}")
        