from flask import Flask, request, jsonify

app = Flask(__name__)

temp, humidity, heatindex = 0

# This is Arduino connecting to server
@app.route("/", methods=['POST', 'GET'])
def root():
  global temp, humidity, heatindex

  if request:
    print(request.values)
    return "Message received! :D"
  return "Message failed... :C"

# This is client computer connecting to server
@app.route("/data", methods=['GET'])
def data():
  global temp, humidity, heatindex
  data = {"temp": temp, "humidity": humidity, "heatindex": heatindex}
  return data

app.run(host="0.0.0.0", port=80)