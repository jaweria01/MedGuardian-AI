import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()  # Load values from .env file

client = MongoClient(os.getenv("MONGO_URI"))  # ← from .env file
db = client[os.getenv("DB_NAME")] # ← uses DB_NAME = medguardian
report_collection = db["reports"] # ← collection where data is saved

