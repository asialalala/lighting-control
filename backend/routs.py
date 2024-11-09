import random
import string
from flask import Flask, jsonify, request
from flask_cors import CORS
from kasa import Device, Discover, Module, Credentials
from models import DeviceParameters

creds = Credentials("asklas@op.pl", "asia2002")

# Routes
app = Flask(__name__)
CORS(app)

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
async def route_set_temperature():
    print("Try to set temperature")
    data = request.form
    temp = data['temperature']
    dev = await Discover.discover_single("{ip}", credentials = creds)
    await dev.update()
    print('Set temperature in device ', "{ip}")
    if light := dev.modules.get("Light"):
        if light.is_color:
            print("Setting temperature...")
            await light.set_color_temp(temp)
            await dev.update()
    else:
        print("Unable to set tremperature in this device.")

@app.route('/api/set-colour/<ip>', methods=['POST'])
async def route_set_colour():
    print("Try to set colour")
    dev = await Discover.discover_single("{ip}", credentials = creds)
    await dev.update()
    print('Set colour in device', "{ip}")
    data = request.form
    hue : int = data['hue']
    saturation : int = data['saturation']
    value : int = data['value']
    print('Set hue', hue, ' sat ', saturation, ' value ', value)

    if light := dev.modules.get("Light"):
        if light.is_color:
            print("Setting colour...")
            await light.set_hsv(hue=hue, saturation=saturation, value=value)
            await dev.update()
    else:
        print("Unable to set colour in this device.")

@app.route('/api/set-brightness/<ip>', methods=['POST'])
async def route_set_brightness():
    print("Try to set brightness")
    dev = await Discover.discover_single("{ip}", credentials = creds)
    await dev.update()
    print('Set brightness on device', "{ip}")
    data = request.form
    brightness : int = data['brightness']
    print('brightness ', brightness)
    if light := dev.modules.get("Light"):
        print("Setting colour...")
        await light.set_brightness(brightness)
        await dev.update()
    else:
        print("Unable to set brightness in this device.")

@app.route('/api/get-parameters/<ip>')
async def route_get_parameters(ip: str) -> dict:
    print("Try get parameters")
    # dev = await Discover.discover_single(ip, credentials=creds)
    # print('Get parameters from device')
    
    response = {
        "voltage": str(random.randint(1,5)),
        "current": str(random.randint(1,8)),
        "power": str(random.randint(1,9)),
        "hue": str(random.randint(1,9)),
        "saturation": str(random.randint(1,9)),
        "value": str(random.randint(1,9)),
        "brightness": str(random.randint(1,9)),
        "temperature": str(random.randint(1,9)),
    }
    return response

if __name__ == '__main__':
    app.run()


