from datetime import datetime
from typing import Optional


from app.schemas.base import CreateBase, InDBBase, ResponseBase, UpdateBase
from datetime import datetime
from typing import ClassVar

# request
# Properties to receive on item creation
# in
class ProjectCreate(CreateBase):

    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[str] = None


# Properties to receive on item update
# in
class ProjectUpdate(UpdateBase):
    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[str] = None
    is_deleted: Optional[bool] = None


# Properties to return to client
# curd model
# out
class Project(ResponseBase):
    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[str] = None
    is_deleted: Optional[bool] = None
    articles: Optional[list] = None
    process_status: Optional[str] = None
    table_name: ClassVar[str] = "projects"


# Properties properties stored in DB
class ProjectInDB(InDBBase):
    category: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[str] = None
    is_deleted: Optional[bool] = None
    articles: Optional[list] = None
    process_status: Optional[str] = None
