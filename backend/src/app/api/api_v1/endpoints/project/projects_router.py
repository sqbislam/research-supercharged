
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
     return await project.get_all_projects(session)

@router.get("/{project_id}")
async def get_project(project_id: int, session: SessionDep) -> Project:
    return await project.get_with_summary(session, id=project_id)

@router.get("/status/{project_id}")
async def get_project_status(project_id: str, session: SessionDep):
    response = await project.get_with_summary(session, id=project_id)
    if(response and response.process_status):
        return response
    else:
        return {'process_status':"FAILED"}
 