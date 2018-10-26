from flask import Flask, render_template, request, session, jsonify, make_response
import json
from server.common.database import Database
from server.models.test import Test

app = Flask(__name__)
#app.config.from_object('config')
app.secret_key = "123"

@app.before_first_request
def initialize_database():
    Database.initialize()


@app.route('/test', methods=['POST'])
def create_test():
        #data = request.get_json()
    print(request.get_json(), 'the json')
    data = request.data
    print(data, 'the data')
    # text = data['content']
    # print(text, 'the text')

    return 'hello'
