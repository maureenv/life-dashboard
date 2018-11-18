import json
import os
from flask import Flask, flash, url_for, redirect, render_template, request, session, jsonify, make_response, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
from server.common.database import Database
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
    return jsonify(Recipe.get_recipes())

@app.route('/recipes/<string:id>')
def get_recipe(id):
    return jsonify(Recipe.get_recipe(id))

@app.route('/recipes/delete/<string:id>', methods=['DELETE'])
def delete_recipe(id):
    jsonify(Recipe.delete_recipe(id))
    #return jsonify(Recipe.get_recipes())
    return make_response(get_recipes())

@app.route('/recipes/new', methods=['POST', 'GET'])
def create_recipe():
    data = request.get_json()
    title = data['title']
    ingredients = data['ingredients']
    directions = data['directions']
    recipe_link = data['recipe_link']

    recipe = Recipe.create(title, ingredients, directions, recipe_link )
    return jsonify(recipe)

@app.route('/recipes/update', methods=['PUT'])
def update_recipe():
    data = request.get_json()
    id = data['_id']
    title = data['title']
    ingredients = data['ingredients']
    directions = data['directions']
    recipe_link = data['recipe_link']

    recipe = Recipe.update(id, title, ingredients, directions, recipe_link )
    return jsonify(recipe)

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        if 'file' not in request.files:
            # flash('No file part')
            return 'No file part'
        id = request.form['id']
        file = request.files['file']
        file_prefix = file.filename.rsplit('.', 1)[1].lower()
        file.filename = id + "." + file_prefix
        if file.filename == '':
            flash('No selected file')
            return 'No selected file'

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
