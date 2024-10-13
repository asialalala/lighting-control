from flask import Flask, jsonify
from kasa import Device, Discover, Module

# Routes
app = Flask(__name__)
@app.route('/api/data')
def get_data():
    data = {
        'title': 'Welcome to Angular-Python App',
        'message': 'This is an example integration between Angular and Python!'
    }
    return jsonify(data)

@app.route('/api/turn-on/<ip>')
async def turn_on(dev: Device):
    print("Try to turn on")
    dev = await Discover.discover_single("{ip}", username="asklas@op.pl", password="asia2002")
    print('Turn on the light ', dev)
    await dev.turn_on()
    await dev.update()

@app.route('/api/turn-off/<ip>')
async def turn_off(dev: Device):
    print("Try to turn off")
    dev = await Discover.discover_single("{ip}", username="asklas@op.pl", password="asia2002")
    print('Turn off the light ', dev)
    dev.turn_off()
    await dev.update()

@app.route('/api/get-devices')
async def route_get_all_devices():
    print("Get devices")
    devices = await Discover.discover(username="asklas@op.pl", password="asia2002")
    for dev in devices.values():
        print(dev.host)
    return devices

@app.route('/api/set-temperature/<ip>')
async def set_remperature(dev: Device):
    print("Try to set temperature")
    dev = await Discover.discover_single("{ip}", username="asklas@op.pl", password="asia2002")
    print('Set temperature ', dev)
    temp: int = 90
    if Module.Light in dev.modules:
        if light.is_color:
            print("Setting temperature...")
            light = dev.modules[Module.Light]
            await light.set_color_temp(temp)
            await dev.update()
    else:
        print("Unable to set tremperature in this device.")

@app.route('/api/set-colour/<ip>')
async def set_colour(dev: Device):
    print("Try to set colour")
    dev = await Discover.discover_single("{ip}", username="asklas@op.pl", password="asia2002")
    print('Set colour ', dev)
    _hue : int  = 0
    _saturation : int = 100
    _value : int = 50

    if Module.Light in dev.modules:
        if light.is_color:
            print("Setting colour...")
            light = dev.modules[Module.Light]
            await light.set_hsv(hue=_hue, saturation=_saturation, value=_value)
            await dev.update()
    else:
        print("Unable to set colour in this device.")

@app.route('/api/set-brightness/<ip>')
async def set_brightness(dev: Device):
    print("Try to set brightness")
    dev = await Discover.discover_single("{ip}", username="asklas@op.pl", password="asia2002")
    print('Set brightness ', dev)
    _brightness : int = 50

    if Module.Light in dev.modules:
        print("Setting colour...")
        light = dev.modules[Module.Light]
        await light.set_brightness(_brightness)
        await dev.update()
    else:
        print("Unable to set brightness in this device.")

if __name__ == '__main__':
    app.run()


