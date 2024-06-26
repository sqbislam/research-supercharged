"""
-*- coding: utf-8 -*-
@Organization : SupaVision
@Author       : 18317
@Date Created : 11/01/2024
@Description  :
"""

from typing import ClassVar, Optional

from pydantic import BaseModel, ConfigDict
from datetime import datetime
# request


# Shared properties
# class CRUDBaseModel(BaseModel):
#     # where the data
#     table_name: str


# Properties to receive on item creation
# in
class CreateBase(BaseModel):
    # inherent to add more properties for creating
    Config: ClassVar[ConfigDict] = ConfigDict(
        extra="ignore", arbitrary_types_allowed=True
    )


# Properties to receive on item update
# in


class UpdateBase(BaseModel):
    # inherent to add more properties for updating
    id: str


# response


# Properties shared by models stored in DB
class InDBBase(BaseModel):
    id: Optional[int]
    created_at: Optional[datetime]

# Properties to return to client
# curd model
# out
class ResponseBase(InDBBase):
    # inherent to add more properties for responding
    table_name: ClassVar[str] = "ResponseBase".lower()
    Config: ClassVar[ConfigDict] = ConfigDict(
        extra="ignore", arbitrary_types_allowed=True
    )
