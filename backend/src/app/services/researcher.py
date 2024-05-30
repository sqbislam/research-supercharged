import asyncio
from app.core.config import settings
from app.services.aigenerator import AIGenerator
from app.services.collection_creator import ChromaCollectionCreator
from app.services.document_processor import DocumentProcessor
from app.services.embedding_client import EmbeddingClient


class Researcher:
    def __init__(self, urls = [], vectorstore=None):
        self.processor = DocumentProcessor(urls)
        self.embed_client = EmbeddingClient(**settings.EMBED_CONFIG) 
        self.chroma_creator = ChromaCollectionCreator(self.processor, self.embed_client)
        
    async def extract_pages(self):
        await self.processor.ingest_documents()
        return self.processor.pages
    
    def get_summary(self):
        self.processor.ingest_documents()
        self.chroma_creator.create_chroma_collection()
        generator = AIGenerator(self.chroma_creator)
        responses = generator.generate_summary()
        return responses