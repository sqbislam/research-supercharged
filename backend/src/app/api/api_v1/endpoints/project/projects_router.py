from app.api.api_v1.endpoints.project.project_service import ProjectsService
from app.api.deps import SessionDep
from app.schemas.project import Project, ProjectCreate
from fastapi import APIRouter
from app.crud import project

router = APIRouter()
_projects_service = ProjectsService()



@router.post("/projects/create")
async def create_project(project_in: ProjectCreate, session: SessionDep):
    return await project.create(session, obj_in=project_in)

@router.get("/projects/")
async def get_projects(session: SessionDep) -> list[Project]:
     return await project.get_all(session)

@router.get("/projects/{project_id}/articles")
def get_articles_for_project(project_id: str) -> ProjectsService.GetProjectsRes:
    articles = _projects_service.query_articles(project_id)
    return articles