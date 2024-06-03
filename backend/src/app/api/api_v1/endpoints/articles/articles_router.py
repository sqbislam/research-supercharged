
import asyncio
import logging
from app.api import database
from app.api.deps import SessionDep, get_db
from app.schemas.articles import Article, ArticleCreate, ArticlesAssign
from app.schemas.project import Project
from app.services.researcher import Researcher
from fastapi import APIRouter, BackgroundTasks
import urllib, urllib.request
from app.common.xml_parser import XMLParser
from app.crud import article, project
from fastapi.responses import PlainTextResponse


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
async def create_articles(data: list[ArticleCreate], session: SessionDep):
    # Check if articles already assigned to the project
    
    # Also check if articles deleted in the new data and remove them from the db
    
    
    res = await article.create(session, obj_in=data)
    return res

@router.post("/extract/", response_class=PlainTextResponse)
async def extract_articles(data: ArticlesAssign):
    article_dump = [a.model_dump() for a in data.articles]
    urls = [a['link'] for a in article_dump]
    researcher = Researcher(urls)
    response = researcher.get_summary()
    return response


# Background Task for Extracting Articles
async def project_start_task(data: ArticlesAssign, project_id:str):
    article_dump = [a.model_dump() for a in data.articles]
    urls = [a['link'] for a in article_dump]
    article_ids = [a['uid'] for a in article_dump]
    db = await database.db()
    try:
        # Run the task in the background asynchronously
        researcher = Researcher(urls)
        loop = asyncio.get_running_loop()
        result = await loop.run_in_executor(None, lambda: researcher.get_summary())
        
        
        result_summary = None
        # Insert summary into the database
        if(db and result):
            data, count = (
                await db.table('summaries').insert({'summary': result, 'project_id':project_id, 'article_ids':article_ids}).execute()
            ) 
            _, created = data
            result_summary=created
        
        logging.info(f"Result Summary: {result_summary}")
        # Update the status of project to SUCCESS
        if(db and result_summary):
            data, _ = (
                await db.table(Project.table_name).update({'process_status': "SUCCESS"}).eq('id', project_id).execute()
            )
    except:
        # Update the status of project to FAILED
        if(db):
            data, _ = (
                await db.table(Project.table_name).update({'process_status': "FAILED"}).eq('id', project_id).execute()
            )
        logging.error("Error in extracting summary")
        return False
    finally:
        await db.auth.sign_out()
    


@router.post("/extract/start")
async def start_background_task(data: ArticlesAssign, session: SessionDep, background_tasks: BackgroundTasks):
    background_tasks.add_task(project_start_task, data, data.project_id)
    response = await project.task_status(session, id=data.project_id, task_status="RUNNING")
    return response


