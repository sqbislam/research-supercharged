from datetime import datetime
from typing import Optional
from app.schemas.base import CreateBase, InDBBase, ResponseBase, UpdateBase
from typing import ClassVar

from pydantic import BaseModel

# request
# Properties to receive on item creation
# in
class AuthorList(BaseModel):
    author_list: list[str]
    
class ArticleCreate(CreateBase):
    uid: Optional[str] = None
    title: Optional[str] = None
    authors: Optional[AuthorList] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None
    published_date: Optional[str] = None
    journal_ref: Optional[str] = None
    project_id: Optional[int]
    doi: Optional[str] = None
    table_name: ClassVar[str] = "articles"

# Properties to receive on item update
# in
class ArticleUpdate(UpdateBase):
    title: Optional[str] = None
    authors: Optional[AuthorList] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None


# Properties to return to client
# curd model
# out
class Article(ResponseBase):
    uid: Optional[str] = None
    title: Optional[str] = None
    authors: Optional[AuthorList] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None
    published_date: Optional[datetime] = None
    journal_ref: Optional[str] = None
    doi: Optional[str] = None
    table_name: ClassVar[str] = "articles"


# Properties properties stored in DB
class ArticleInDB(InDBBase):
    title: Optional[str] = None
    authors: Optional[AuthorList] = None
    link: Optional[str] = None
    abstract: Optional[str] = None
    category: Optional[str] = None
    published_date: Optional[datetime] = None
    journal_ref: Optional[str] = None
    doi: Optional[str] = None
    project_id: int 

class ArticlesAssign(CreateBase):
    articles: list[ArticleCreate]
    project_id: int
    