"""
-*- coding: utf-8 -*-
@Organization : SupaVision
@Author       : 18317
@Date Created : 05/01/2024
@Description  :
"""

from contextlib import contextmanager
import logging
from typing import Annotated

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from gotrue.errors import AuthApiError
from supabase_py_async import AsyncClient, create_client
from supabase_py_async.lib.client_options import ClientOptions

from app.core.config import settings
from app.schemas.auth import UserIn

super_client: AsyncClient | None = None


async def init_super_client() -> None:
    """for validation access_token init at life span event"""
    global super_client
    super_client = await create_client(
        settings.SUPABASE_URL,
        settings.SUPABASE_KEY,
        options=ClientOptions(postgrest_client_timeout=10, storage_client_timeout=10),
    )
    await super_client.auth.sign_in_with_password(
        {"email": settings.SUPERUSER_EMAIL, "password": settings.SUPERUSER_PASSWORD}
    )


# auto get access_token from header
reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl="please login by supabase-js to get token"
)
AccessTokenDep = Annotated[str, Depends(reusable_oauth2)]


async def get_current_user(access_token: AccessTokenDep) -> UserIn:
    """get current user from access_token and  validate same time"""
    if not super_client:
        raise HTTPException(status_code=500, detail="Super client not initialized")

    user_rsp = await super_client.auth.get_user(jwt=access_token)
    if not user_rsp:
        logging.error("User not found")
        raise HTTPException(status_code=404, detail="User not found")
    return UserIn(**user_rsp.user.model_dump(), access_token=access_token)


CurrentUser = Annotated[UserIn, Depends(get_current_user)]


async def get_db() -> AsyncClient:
    client: AsyncClient | None = None
    try:
        client = await create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY,
            options=ClientOptions(
                postgrest_client_timeout=10, storage_client_timeout=10
            ),
        )
        await client.auth.sign_in_with_password({"email": settings.SUPERUSER_EMAIL, "password": settings.SUPERUSER_PASSWORD})
        # # checks all done in supabase-py !
        # # await client.auth.set_session(token.access_token, token.refresh_token)
        # session = await client.auth.get_session()
        yield client

    except AuthApiError as e:
       
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )
    finally:
        if client:
            await client.auth.sign_out()


SessionDep = Annotated[AsyncClient, Depends(get_db)]
