
from app.crud.base import CRUDBase
from app.schemas import Summary, SummaryCreate, SummaryUpdate
from supabase_py_async import AsyncClient

class CRUDSummary(CRUDBase[Summary, SummaryCreate, SummaryUpdate]):
    async def create(self, db: AsyncClient, *, obj_in: SummaryCreate) -> Summary:
        return await super().create(db, obj_in=obj_in)

    async def get(self, db: AsyncClient, *, id: str) -> Summary | None:
        return await super().get(db, id=id)

    async def get_all(self, db: AsyncClient) -> list[Summary]:
        return await super().get_all(db)

    async def update(self, db: AsyncClient, *, obj_in: SummaryUpdate) -> Summary:
        return await super().update(db, obj_in=obj_in)

    async def delete(self, db: AsyncClient, *, id: str) -> Summary:
        return await super().delete(db, id=id)


summary = CRUDSummary(Summary)
