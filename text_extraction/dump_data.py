import json
from pymongo import MongoClient

uri = "mongodb+srv://trendall_admin:trendall_admin@trendallproject.4hr05ar.mongodb.net/?retryWrites=true&w=majority&appName=TrendallProject"

# Create a MongoDB client
client = MongoClient(uri)

# Connect to database
db = client["trendall_records"]
collection = db["records"]

# Load data from the JSON file
with open("records.json") as f:
    data = json.load(f)

# Insert data into the collection
collection.insert_many(data)
