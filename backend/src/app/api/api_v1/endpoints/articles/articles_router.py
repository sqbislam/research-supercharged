
from app.api.deps import SessionDep
from app.schemas.articles import ArticleCreate, ArticlesAssign
from app.services.researcher import Researcher
from fastapi import APIRouter
import urllib, urllib.request
from app.common.xml_parser import XMLParser
from app.crud import article


router = APIRouter()
xml_parser = XMLParser()


@router.get("/fetch")
async def fetch_articles(search_query: str, start: int = 0, max_results: int=10):
    
    url = f'http://export.arxiv.org/api/query?search_query=all:"{search_query.replace(" ", "%20")}"&start={start}&max_results={max_results}'
    data = urllib.request.urlopen(url)
    res = data.read().decode('utf-8')
    parsed_data = await xml_parser.parse(res)
    return parsed_data

@router.post("/assign/")
async def create_articles(data: ArticlesAssign, session: SessionDep):
    res_articles = []
    for a in data.articles:
        a['project_id'] = data.project_id        
        res_articles.append(a)
    res = await article.create(session, obj_in=res_articles)
    return res

@router.post("/extract/")
async def extract_articles(data: list[ArticleCreate], session: SessionDep):
    urls = [a.link for a in data]
    researcher = Researcher(urls)
    response = await researcher.get_summary()
    return response