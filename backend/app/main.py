from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="Resource Management System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "status": "Backend is running",
        "message": "RMS API working correctly"
    }

@app.get("/api/health")
def health_check():
    return {
        "backend": "ok",
        "database": "not checked"
    }


# To test backend is working or not. Do this steps:
# 
# 1. cd backend
# 2. uvicorn app.main:app --reload
# 3. Open these urls http://127.0.0.1:8000/ or http://127.0.0.1:8000/api/health
