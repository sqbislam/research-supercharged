from app.api.deps import SessionDep
from app.schemas import Summary, SummaryCreate
from fastapi import APIRouter
from app.crud import summary

router = APIRouter()



@router.post("/create")
async def create_summary(summary_in: SummaryCreate, session: SessionDep):
    return await summary.create(session, obj_in=summary_in)

@router.get("/")
async def get_summaries(session: SessionDep) -> list[Summary]:
     return await summary.get_all(session)

@router.get("/{summary_id}")
async def get_summary(summary_id: int, session: SessionDep) -> Summary:
    return await summary.get(session, id=summary_id)
