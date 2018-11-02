import json
import os
from flask import Flask, flash, url_for, render_template, request, session, jsonify, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from server.common.database import Database
from server.models.test import Test
from server.models.recipe import Recipe

UPLOAD_FOLDER = '/Users/maureenvogel/webprojects/images'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
# http://flask.pocoo.org/docs/1.0/patterns/fileuploads/
# f = open('asdf.jpg', 'wb') write mode plus binary mode
# f.write(data)
# {
#   _id: asdasdf,
#   name: 'Hot dog',
#   ingredients: ['hot dog', 'bun'],
#   images: ['image1.jpg', 'image2.jpg'],
# }
# {
#   _id: asdasdf,
#   name: 'Hot dog',
#   ingredients: ['hot dog', 'bun'],
#   images: ['image1.jpg', 'image2.jpg'],
# }

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)
#app.config.from_object('config')
app.secret_key = "123"

@app.before_first_request
def initialize_database():
    Database.initialize()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/recipes', methods=['POST', 'GET'])
def create_recipe():
    if request.method == 'POST':
        if 'image' not in request.files:
            print('file not in request.files')
            flash('No file part')
            return 'No file part'
        file = request.files['image']
        print(file, 'the file')
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return 'No selected file'
        if file and allowed_file(file.filename):
            print('in allowed files')
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            # return redirect(url_for('uploaded_file',
            #                         filename=filename))


    # data = request.get_json()
    # title = data['title']
    # ingredients = data['ingredients']
    # directions = data['directions']
    # recipe_link = data['recipeLink']
    # cuisine_type = data['cuisineType']
    # # _(self, title, ingredients, directions, recipe_link, cuisine_type, _id=None):
    # #print(title, 'title', ingredients, 'ingredients', directions, 'directions')
    # Recipe.create(title, ingredients, directions, recipe_link, cuisine_type)
    #
    # return jsonify(Recipe.get_recipes())
    return 'hi'
