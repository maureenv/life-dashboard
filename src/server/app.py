import json
import os
from flask import Flask, flash, url_for, redirect, render_template, request, session, jsonify, make_response, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from server.common.database import Database
from server.models.test import Test
from server.models.recipe import Recipe

UPLOAD_FOLDER = '/Users/maureenvogel/webprojects/python/life-dashboard/src/static/_res/serverImages'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

app.secret_key = "123"

@app.before_first_request
def initialize_database():
    Database.initialize()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/recipes')
def get_recipes():
    print('getting all recipes')
    return jsonify(Recipe.get_recipes())

@app.route('/recipes/<string:id>')
def get_recipe(id):
    print(jsonify(Recipe.get_recipe(id)), 'the recipe I found')
    #return jsonify(Recipe.get_recipes())
    return jsonify(Recipe.get_recipe(id))

@app.route('/recipes/new', methods=['POST', 'GET'])
def create_recipe():
    data = request.get_json()
    title = data['title']
    ingredients = data['ingredients']
    directions = data['directions']
    recipe_link = data['recipe_link']
    cuisine_type = data['cuisine_type']

    recipe = Recipe.create(title, ingredients, directions, recipe_link, cuisine_type)
    # return jsonify(Recipe.get_recipes())
    return jsonify(recipe)

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            # flash('No file part')
            return 'No file part'
        id = request.form['id']
        print(id, 'the id')
        file = request.files['file']
        file_prefix = file.filename.rsplit('.', 1)[1].lower()
        file.filename = id + "." + file_prefix
        print(file, 'the file')
        if file.filename == '':
            flash('No selected file')
            return 'No selected file'

        if file and allowed_file(file.filename):
            print('in allowed files')
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
