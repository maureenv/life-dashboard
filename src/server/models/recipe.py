import uuid
from ..common.database import Database

class Recipe(object):
    def __init__(self, _id, title, ingredients, directions, recipe_link):
        self._id = _id
        self.title = title
        self.ingredients = ingredients
        self.directions = directions
        self.recipe_link = recipe_link

    @classmethod
    def create(Cls, title, ingredients, directions, recipe_link, _id=None):
        data = {
            'title': title,
            'ingredients': ingredients,
            'directions': directions,
            'recipe_link': recipe_link,
            '_id': uuid.uuid4().hex if _id is None else _id,
        }
        Database.insert(collection='recipes', data=data)

        return data

    @classmethod
    def update(Cls, id, title, ingredients, directions, recipe_link ):
        data = {
            '_id': id,
            'title': title,
            'ingredients': ingredients,
            'directions': directions,
            'recipe_link': recipe_link,
        }
        Database.update(collection='recipes', query={ '_id': id }, data=data )

        return data

    @classmethod
    def get_recipes(Cls, return_models=False):
        print( 'GET RECIPES CALLED')
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

    @classmethod
    def delete_recipe(Cls, recipe_id, return_model=False):
        Database.delete_one(collection='recipes', query={'_id': recipe_id})
