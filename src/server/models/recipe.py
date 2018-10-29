import uuid
from ..common.database import Database

class Recipe(object):
    def __init__(self, title, ingredients, directions, recipe_link, cuisine_type, _id=None):
        self.title = title
        self.ingredients = ingredients,
        self.directions = directions,
        self.recipe_link = recipe_link,
        self.cuisine_type = cuisine_type
        self._id = uuid.uuid4().hex if _id is None else _id

    def save_to_mongo(self):
        Database.insert(collection='recipes', data=self.json())

    def json(self):
        return {
            'title': self.title,
            'ingredients': self.ingredients,
            'directions': self.directions,
            'recipe_link': self.recipe_link,
            'cuisine_type': self.cuisine_type,
            '_id': str(self._id),
        }

    def get_blogs(cls):
        recipes = Database.find(collection='recipes', query={})

        return [ cls(**recipes) for recipe in recipes ]
