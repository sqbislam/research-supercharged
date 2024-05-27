
from app.api.deps import SessionDep
from fastapi import APIRouter
import urllib, urllib.request
from app.common.xml_parser import XMLParser
router = APIRouter()
xml_parser = XMLParser()


@router.get("/articles/")
async def fetch_articles(session: SessionDep):

    url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=2'
    data = urllib.request.urlopen(url)
    res = data.read().decode('utf-8')
    parsed_data = await xml_parser.parse(res)
    return parsed_data