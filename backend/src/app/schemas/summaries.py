
    
from typing import Optional
from app.schemas.base import CreateBase, InDBBase, ResponseBase, UpdateBase


class SummaryCreate(CreateBase):
    summary: Optional[str] = None
    project_id: Optional[int] = None
    article_ids: Optional[str] = None


# Properties to receive on item update
# in
class SummaryUpdate(UpdateBase):
    summary: Optional[str] = None
    project_id: Optional[int] = None
    article_ids: Optional[str] = None


# Properties to return to client
# curd model
# out
class Summary(ResponseBase):
    summary: Optional[str] = None
    project_id: Optional[int] = None
    article_ids: Optional[str] = None
    table_name = "summaries"


# Properties properties stored in DB
class SummaryInDB(InDBBase):
    summary: Optional[str] = None
    project_id: Optional[int] = None
    article_ids: Optional[str] = None
