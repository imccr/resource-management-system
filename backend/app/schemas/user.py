from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    class_id: Optional[int] = None
    campus_rollno: Optional[str] = None
    role_id: int
    is_active: bool = True
    department_id: Optional[int] = None