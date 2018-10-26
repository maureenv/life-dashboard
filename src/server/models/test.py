import uuid
from ..common.database import Database

class Test(object):
    def __init__(self, testText, _id=None):
        self.testText = testText
        self._id = uuid.uuid4().hex if _id is None else _id

    def save_to_mongo(self):
        Database.insert(collection='test_collection', data=self.json())

    def json(self):
        return {
            'testText': self.testText,
            '_id': self._id
        }
