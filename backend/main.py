import asyncio
import time
from kasa import Discover
from routs import *

if __name__=="__main__":
    try:
        app.run()
    except Exception as e:
        print(f"An error occurred: {e}")
    # finally:
    #     # Explicitly close all running event loops (if any)
    #     loop = asyncio.get_event_loop()
    #     loop.run_until_complete(loop.shutdown_asyncgens())
    #     loop.close()
