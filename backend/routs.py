import asyncio
import random
import string
from flask import Flask, jsonify, request
from flask_cors import CORS
from kasa import Device, Discover, Module, Credentials, SmartPlug
from models import DeviceParameters

creds = Credentials("asklas@op.pl", "asia2002")

# Routes
app = Flask(__name__)
CORS(app)

# async def doFun():
#     dev = await Discover.discover_single("192.168.8.113", credentials=creds)
#     await dev.update()
#     if cloud := dev.modules.get("Cloud"):
#         print("cloud")

#     print("after if")

# asyncio.run(doFun()) 

@app.route('/api/data')
def get_data():
    data = {
        'title': 'Welcome to Angular-Python App',
        'message': 'This is an example integration between Angular and Python!'
    }
    return jsonify(data)

@app.route('/api/get-devices')
async def route_get_all_devices():
    print("Get devices")
    devices = await Discover.discover(credentials = creds)
    for dev in devices.values():
        print(dev.host)
    return devices

@app.route('/api/turn-on/<ip>')
async def route_turn_on(ip: string):
    print("Try to turn on")
    dev = await Discover.discover_single(ip, credentials = creds)
    print('Turn on the light in device', dev.modules)
    await dev.turn_on()
    await dev.update()

@app.route('/api/turn-off/<ip>')
async def route_turn_off(ip: string):
    print("Try to turn off")
    dev = await Discover.discover_single(ip, credentials = creds)
    print('Turn off the light in device', "{ip}")
    await dev.turn_off()
    await dev.update()

@app.route('/api/set-temperature/<ip>', methods=['POST'])
async def route_set_temperature(ip):
    print("Try to set temperature")
    data = request.json
    temp = int(data.get('temperature', 0))
    dev = await Discover.discover_single(ip, credentials = creds)
    await dev.update()
    print('Set temperature in device ', ip)
    if light := dev.modules.get("Light"):
        if light.is_color:
            print("Setting temperature...")
            await light.set_color_temp(temp)
            await dev.update()
            return jsonify({"status": "success", "message": "Temperature set successfully"}), 200
        else:
            return jsonify({"status": "error", "message": "Device does not support temperature adjustment"}), 400
    else:
        print("Unable to set tremperature in this device.")
        return jsonify({"status": "error", "message": "Device does not support temperature adjustment"}), 400

@app.route('/api/set-colour/<ip>', methods=['POST'])
async def route_set_colour(ip):
    print("Try to set colour")
    dev = await Discover.discover_single(ip, credentials = creds)
    await dev.update()
    print('Set colour in device', "{ip}")
    data = request.json
    hue = int(data.get('hue', 0))
    saturation = int(data.get('saturation', 0))
    value = int(data.get('value', 0))
    print('Set hue', hue, ' sat ', saturation, ' value ', value)

    if light := dev.modules.get("Light"):
        if light.is_color:
            print("Setting colour...")
            await light.set_hsv(hue=hue, saturation=saturation, value=value)
            await dev.update()
            return jsonify({"status": "success", "message": "Color set successfully"}), 200
    else:
        print("Unable to set colour in this device.")
        return jsonify({"status": "error", "message": "Device does not support color adjustment"}), 400


@app.route('/api/set-brightness/<ip>', methods=['POST'])
async def route_set_brightness(ip):
    print("Try to set brightness")
    dev = await Discover.discover_single(ip, credentials = creds)
    await dev.update()
    print('Set brightness on device', "{ip}")
    data = request.json
    brightness = int(data.get('brightness', 0))
    print('brightness ', brightness)

    if light := dev.modules.get("Light"):
        print("Setting colour...")
        await light.set_brightness(brightness)
        await dev.update()
        return jsonify({"status": "success", "message": "Brightness set successfully"}), 200
    else:
        print("Unable to set brightness in this device.")
        return jsonify({"status": "error", "message": "Device does not support brightness adjustment"}), 400

@app.route('/api/get-parameters/<ip>', methods=['GET'])
async def route_get_parameters(ip: str) -> dict:
    print("Try get parameters")
    # dev = await Discover.discover_single(ip, credentials=creds)
    # print('Get parameters from device')
    
    dev = await Discover.discover_single("192.168.8.113", credentials = creds)
    print("emeter ", dev.has_emeter)
    # await dev.update()
    # dev = SmartPlug("192.168.8.113")
    # for feature_name in dev.features:
    #     print(feature_name)

    # for module_name in dev.modules:
    #     print(module_name)

    # usage = dev.modules["usage"]
    # print(f"Minutes on this month: {usage.usage_this_month}")
    # print(f"Minutes on today: {usage.usage_today}")

    # if light := dev.modules.get("Light"):
    #     brightness =  light.brightness
    #     temperature =  light.color_temp
    #     hsv =  light.hsv

    # if volt := dev.modules.get("Energy"):
    #     print("energy")
    #     voltage = volt.value
    
    # if curr := dev.modules.get("current"):
    #     print("current")
    #     current = dev.current
    #     power = dev.power

    # response = {
    #     "voltage": voltage,
    #     "current": current,
    #     "power": power,
    #     "hue": hsv.hue,
    #     "saturation": hsv.saturation,
    #     "value": hsv.value,
    #     "brightness": brightness,
    #     "temperature": temperature,
    # }

    response = {
        "voltage": "1",
        "current": "2",
        "power": "3",
        "hue": "4",
        "saturation": "5",
        "value": "6",
        "brightness": "7",
        "temperature": "5",
    }
    return response

if __name__ == '__main__':
    app.run()


