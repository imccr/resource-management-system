import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# 1. Load the variables from your .env file into os.environ
load_dotenv()

# 2. Retrieve the DATABASE_URL string
DATABASE_URL = os.getenv("DATABASE_URL")

# 3. Initialize the SQLAlchemy engine and session
engine = create_engine(DATABASE_URL)

# Test the connection
try:
    with engine.connect() as connection:
        print("Connection successful!")
except Exception as e:
    print(f"Failed to connect: {e}")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

