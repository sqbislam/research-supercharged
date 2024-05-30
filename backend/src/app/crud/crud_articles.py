from app.schemas.articles import Article, ArticleCreate, ArticleUpdate
from supabase_py_async import AsyncClient

from app.crud.base import CRUDBase
from app.schemas import Project, ProjectCreate, ProjectUpdate
from app.schemas.auth import UserIn


class CRUDArticles(CRUDBase[Article, ArticleCreate, ArticleUpdate]):
    async def create(self, db: AsyncClient, *, obj_in: list[ArticleCreate]) -> list[ArticleCreate]:
        model = type[Article]
        """create by CreateSchemaType"""
        
        data, count = (
            await db.table(Article.table_name).insert([ob.model_dump() for ob in obj_in]).execute()
        )
        _, created = data
        return created
        #return await super().create(db, obj_in=obj_in)

    async def get(self, db: AsyncClient, *, id: str) -> Project | None:
        return await super().get(db, id=id)

    async def get_all(self, db: AsyncClient) -> list[Project]:
        return await super().get_all(db)

    async def get_multi_by_owner(self, db: AsyncClient, *, user: UserIn) -> list[Project]:
        return await super().get_multi_by_owner(db, user=user)

    async def delete(self, db: AsyncClient, *, id: str) -> Project:
        return await super().delete(db, id=id)


article = CRUDArticles(Article)
