import uuid
from ..common.database import Database

class Recipe(object):
    def __init__(self, _id, title, ingredients, directions, recipe_link, cuisine_type):
        self._id = _id
        self.title = title
        self.ingredients = ingredients
        self.directions = directions
        self.recipe_link = recipe_link
        self.cuisine_type = cuisine_type

    @classmethod
    def create(cls, title, ingredients, directions, recipe_link, cuisine_type, _id=None):
        data = {
            'title': title,
            'ingredients': ingredients,
            'directions': directions,
            'recipe_link': recipe_link,
            'cuisine_type': cuisine_type,
            '_id': uuid.uuid4().hex if _id is None else _id,
        }
        Database.insert(collection='recipes', data=data)

        return Recipe(**data)

    @classmethod
    def get_recipes(Cls, return_models=False):
        recipes = Database.find(collection='recipes', query={})
        if return_models:
            return [Cls(**r) for r in recipes]
        else:
            return list(recipes)

    @classmethod
    def get_recipe(Cls, recipe_id, return_model=False):
        recipe = Database.find_one(collection='recipes', query={'_id': recipe_id})
        if return_model:
            return Cls(**recipe)
        else:
            return recipe
