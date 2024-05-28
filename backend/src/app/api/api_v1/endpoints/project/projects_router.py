
from app.api.deps import SessionDep
from app.schemas.project import Project, ProjectCreate
from fastapi import APIRouter
from app.crud import project

router = APIRouter()



@router.post("/create")
async def create_project(project_in: ProjectCreate, session: SessionDep):
    return await project.create(session, obj_in=project_in)

@router.get("/")
async def get_projects(session: SessionDep) -> list[Project]:
     return await project.get_all(session)

