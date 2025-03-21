import os
from dotenv import load_dotenv
from pymongo import MongoClient

db = None

def get_mongo_client():
    global db
    if db is None:
        load_dotenv()
        MONGODB_URL = os.environ.get("MONGODB_URL", "mongodb://localhost:27017")
        db = MongoClient(MONGODB_URL)["url_shortener"]
    return db