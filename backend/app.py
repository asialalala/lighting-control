from flask import Flask, jsonify
app = Flask(__name__)
@app.route('/api/data')
def get_data():
    data = {
        'title': 'Welcome to Angular-Python App',
        'message': 'This is an example integration between Angular and Python!'
    }
    return jsonify(data)

@app.route('/api/turn-on')
def turnOn():
    return 'Turn on the light'

@app.route('/api/turn-off')
def turnOff():
    return 'Turn off the light'

if __name__ == '__main__':
    app.run()