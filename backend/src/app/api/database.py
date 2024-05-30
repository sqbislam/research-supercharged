

from supabase_py_async import create_client
from app.core.config import settings
from supabase_py_async.lib.client_options import ClientOptions

async def db():
    super_client = await create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY,
    options=ClientOptions(postgrest_client_timeout=10, storage_client_timeout=10))
    await super_client.auth.sign_in_with_password(
        {"email": settings.SUPERUSER_EMAIL, "password": settings.SUPERUSER_PASSWORD}
    )
    return super_client

 