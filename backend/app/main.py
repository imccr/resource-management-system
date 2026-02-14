from fastapi import FastAPI, Depends, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.database import SessionLocal
from app.routes import admin, users
from dotenv import load_dotenv
import os

load_dotenv()  # Move this to the top

app = FastAPI(title="Resource Management System API", root_path="/api")

FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# CORS - Updated for production
# In production on Vercel, frontend & API share the same origin so CORS isn't
# strictly needed, but we keep localhost for local development.
origins = [
    "http://localhost:3000",  # Local development
    os.getenv("FRONTEND_URL", ""),  # Production frontend (if set)
]

# Remove empty strings
origins = [origin for origin in origins if origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin.router) 
app.include_router(users.router)

@app.get("/")
def root():
    return {"message": "Resource Management System API is running"}

@app.get("/health")
def health_check():
    """Health check endpoint for monitoring"""
    return {
        "status": "healthy",
        "api": "Resource Management System",
        "version": "1.0"
    }

# Uncomment for testing database connection
# @app.get("/db-test")
# def db_test():
#     db = None
#     try:
#         db = SessionLocal()
#         result = db.execute(text("SELECT 1"))
#         return {"database": "connected", "status": "ok"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
#     finally:
#         if db:
#             db.close()