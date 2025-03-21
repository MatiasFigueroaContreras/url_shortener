import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.environ.get("MONGODB_URL", "mongodb://localhost:27017")
MONGODB_URL = "mongodb://localhost:27017"
SITE_URL = os.environ.get("NEXT_PUBLIC_SITE_URL", "http://localhost:3000")
