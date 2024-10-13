import asyncio
import time
from kasa import Discover
from routs import *

async def main():
    await route_get_devices()
    #     await dev.turn_on()
    # time.sleep(5)
    # for dev in devices.values():
    #     await dev.update()
    #     print(dev.host)
    #     await dev.turn_off()

if __name__=="__main__":
    try:
        asyncio.run(main())
    except Exception as e:
        print(f"An error occurred: {e}")
    # finally:
    #     # Explicitly close all running event loops (if any)
    #     loop = asyncio.get_event_loop()
    #     loop.run_until_complete(loop.shutdown_asyncgens())
    #     loop.close()
