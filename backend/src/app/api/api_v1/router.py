from fastapi import APIRouter

from app.api.api_v1.endpoints.items import items_router
from app.api.api_v1.endpoints.project import projects_router
api_router = APIRouter()
api_router.include_router(items_router.router, prefix="/items", tags=["items"])
api_router.include_router(projects_router.router, prefix="/projects", tags=["projects"])
