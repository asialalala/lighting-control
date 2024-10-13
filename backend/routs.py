from connect_kasa import get_devices
from flask import Flask, jsonify

# Routes
app = Flask(__name__)
@app.route('/api/data')
def get_data():
    data = {
        'title': 'Welcome to Angular-Python App',
        'message': 'This is an example integration between Angular and Python!'
    }
    return jsonify(data)

@app.route('/api/turn-on')
def turn_on():
    return 'Turn on the light'

@app.route('/api/turn-off')
def turn_off():
    return 'Turn off the light'

@app.route('/api/get-devices')
async def route_get_devices():
    print("aaa")
    data = await get_devices()
    return data

if __name__ == '__main__':
    app.run()


