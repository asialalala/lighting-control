import asyncio
from kasa import Discover

async def get_devices():
    devices = await Discover.discover(username="asklas@op.pl", password="asia2002")
    for dev in devices.values():
        print(dev.host)
    return devices
