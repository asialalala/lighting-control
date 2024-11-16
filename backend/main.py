import asyncio
import time
from kasa import Discover
from routs import *

if __name__=="__main__":
    try:
        app.run(host='0.0.0.0', port=5000)
    except Exception as e:
        print(f"An error occurred: {e}")
        