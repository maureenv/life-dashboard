import json
from flask import Flask, render_template, request, session, jsonify, make_response
from flask_cors import CORS
from server.common.database import Database
from server.models.test import Test
from server.models.recipe import Recipe

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
CORS(app)
#app.config.from_object('config')
app.secret_key = "123"

@app.before_first_request
def initialize_database():
    Database.initialize()


@app.route('/test', methods=['POST'])
def create_test():
    print(request.get_json(), 'the json')
    data = request.get_json()
    testText = data['content']
    print(testText, 'the test text')
    new_test = Test( testText )
    new_test.save_to_mongo()

    return 'hello'

@app.route('/recipes', methods=['POST'])
def create_recipe():
    print(request.get_json(), 'the recipe json')
    data = request.get_json()
    title = data['title']
    ingredients = data['ingredients']
    directions = data['directions']
    recipe_link = data['recipeLink']
    cuisine_type = data['cuisineType']
    # _(self, title, ingredients, directions, recipe_link, cuisine_type, _id=None):
    print(title, 'title', ingredients, 'ingredients', directions, 'directions')
    Recipe.create(title, ingredients, directions, recipe_link, cuisine_type)

    return jsonify(Recipe.get_recipes())
