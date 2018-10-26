# database class is inheriting from object passed in
import pymongo


class Database(object):
    URI = "mongodb://127.0.0.1:27017" # get server name and port from first line when typing mongo in terminal
    DATABASE = None
    @staticmethod #this tells python that we won't use __init__ and self because this method is only going to belong to the database class as a whole and never an instance of it
    # static method is really just a way to organize
    def initialize():
        # because we're not using self, we need to say where URI is coming from. It's coming from teh database class
        # pymongo.MongoClient is what connects you to the database.
        client = pymongo.MongoClient(Database.URI) #(MongoClient(host=['127.0.0.1:27017'], document_class=dict, tz_aware=False, connect=True)
        Database.DATABASE = client['test'] #db name (Database(MongoClient(host=['127.0.0.1:27017'], document_class=dict, tz_aware=False, connect=True), u'blog')

    @classmethod
    def insert(Cls, collection, data): #collection is the blogs or posts in the DB
        Cls.DATABASE[collection].insert(data)

    @staticmethod
    def find(collection, query):
        return Database.DATABASE[collection].find(query)

    @staticmethod
    def find_one(collection, query):
        return Database.DATABASE[collection].find_one(query)
