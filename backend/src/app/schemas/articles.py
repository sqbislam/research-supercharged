from datetime import datetime
from typing import Optional
from app.schemas.base import CreateBase, InDBBase, ResponseBase, UpdateBase
from typing import ClassVar

# request
# Properties to receive on item creation
# in
class ArticleCreate(CreateBase):
    title: Optional[str] = None
    authors: Optional[str] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None


# Properties to receive on item update
# in
class ArticleUpdate(UpdateBase):
    title: Optional[str] = None
    authors: Optional[str] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None


# Properties to return to client
# curd model
# out
class Article(ResponseBase):
    title: Optional[str] = None
    authors: Optional[str] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None

    table_name: ClassVar[str] = "articles"


# Properties properties stored in DB
class ArticleInDB(InDBBase):
    title: Optional[str] = None
    authors: Optional[str] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None

