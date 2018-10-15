from flask import Flask, render_template, request, session, jsonify, make_response


app = Flask(__name__)
#app.config.from_object('config')
app.secret_key = "123"
