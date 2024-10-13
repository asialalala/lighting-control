from flask import Flask, jsonify
from kasa import Device, Discover

# Routes
app = Flask(__name__)
@app.route('/api/data')
def get_data():
    data = {
        'title': 'Welcome to Angular-Python App',
        'message': 'This is an example integration between Angular and Python!'
    }
    return jsonify(data)

@app.route('/api/turn-on/<dev>')
async def turn_on(dev: Device):
    print('Turn on the light ', dev)
    await dev.turn_on()
    await dev.update()

@app.route('/api/turn-off/<dev>')
async def turn_off(dev: Device):
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

if __name__ == '__main__':
    app.run()


