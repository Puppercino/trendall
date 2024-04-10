import json
from pymongo import MongoClient

mongo_sv = "mongodb+srv://trendall_admin:trendall_admin@trendallproject.4hr05ar.mongodb.net/?retryWrites=true&w=majority&appName=TrendallProject"

# Connect to MongoDB
client = MongoClient(mongo_sv)
db = client["trendall_records"]
collection = db["records"]

with open("records.json", "r") as f:
    data = json.load(f)

# Insert the data into MongoDB
collection.insert_many(data)
