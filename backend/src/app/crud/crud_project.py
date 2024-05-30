from supabase_py_async import AsyncClient

from app.crud.base import CRUDBase
from app.schemas import Project, ProjectCreate, ProjectUpdate
from app.schemas.auth import UserIn


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    async def create(self, db: AsyncClient, *, obj_in: ProjectCreate) -> Project:
        return await super().create(db, obj_in=obj_in)

    async def get(self, db: AsyncClient, *, id: str) -> Project | None:
        return await super().get(db, id=id)

    async def get_all(self, db: AsyncClient) -> list[Project]:
        return await super().get_all(db)

    async def get_multi_by_owner(self, db: AsyncClient, *, user: UserIn) -> list[Project]:
        return await super().get_multi_by_owner(db, user=user)

    async def update(self, db: AsyncClient, *, obj_in: ProjectUpdate) -> Project:
        return await super().update(db, obj_in=obj_in)

    async def delete(self, db: AsyncClient, *, id: str) -> Project:
        return await super().delete(db, id=id)
    async def task_status(self, db: AsyncClient, *, id: str, task_status:str) -> Project:
        data, count = (
            await db.table(Project.table_name).update({'process_status': task_status}).eq('id', id).execute()
        )
        
        return data

project = CRUDProject(Project)
