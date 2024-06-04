from gotrue import User, UserAttributes
from pydantic import BaseModel


class SignInAuth(BaseModel):
    email: str
    password: str

# Shared properties
class Token(BaseModel):
    access_token: str | None = None
    refresh_token: str | None = None

class TokenData(BaseModel):
    username: str | None = None


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


# Properties properties stored in DB
class UserInDB(User):
    hashed_password: str
    
# request
class UserIn(Token, User):
    pass


# Properties to receive via API on creation
# in
class UserCreate(BaseModel):
    pass


# Properties to receive via API on update
# in
class UserUpdate(UserAttributes):
    pass


# response


class UserInDBBase(BaseModel):
    pass


# Properties to return to client via api
# out
class UserOut(Token):
    pass


