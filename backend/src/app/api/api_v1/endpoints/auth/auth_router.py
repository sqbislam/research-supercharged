
from app.api.deps import SessionDep
from app.core.auth import JWTBearer
from app.schemas import SignInAuth
from fastapi import APIRouter, Depends


router = APIRouter()

@router.post("/sign_up")
async def sign_up(credentials:SignInAuth, session: SessionDep):
  credentials_dict = credentials.model_dump()
  res = await session.auth.sign_up(credentials_dict)
  access_token = res.model_dump().get("session").get('access_token')
  refresh_token = res.model_dump().get("session").get('refresh_token')
  return {'access_token':access_token,'refresh_token':refresh_token, 'message':'success'}


@router.get("/sign_out")
def sign_out(session: SessionDep):
  res = session.auth.sign_out()
  return "success"

@router.post("/sign_in")
async def sign_in(credentials:SignInAuth,  session: SessionDep):
  credentials_dict = credentials.model_dump()
  email, password = credentials_dict.get('email'), credentials_dict.get('password')
  res = await session.auth.sign_in_with_password({"email":email, "password": password})
  access_token = res.model_dump().get("session").get('access_token')
  refresh_token = res.model_dump().get("session").get('refresh_token')
  return {'access_token':access_token, 'refresh_token':refresh_token }

@router.post("/test-protected",dependencies=[Depends(JWTBearer())])
async def job():
    return "success"