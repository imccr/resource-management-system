from fastapi import FastAPI,Depends,status,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from app.core.database import SessionLocal
from app.routes import admin, users


app = FastAPI(title="Resource Management System API")
app.include_router(admin.router) 
app.include_router(users.router)

# CORS (for frontend connection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

# @app.get("/db-test")
# def db_test():
#     db = None
#     try:
#         db = SessionLocal()
#         result = db.execute(text("SELECT * FROM rms.users"))
#         rows = result.fetchall()

#         users = []
#         for row in rows:
#             users.append({
#                 "id": row.id,
#                 "full_name": row.full_name,
#                 "email": row.email,
#                 "role_id": row.role_id,
#                 "is_active": row.is_active
#             })

#         return {
#             "count": len(users),
#             "users": users
#         }

#     except Exception as e:
#         return {"error": str(e)}

#     finally:
#         if db:
#             db.close()