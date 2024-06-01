from app.services.document_processor import DocumentProcessor
from app.services.embedding_client import EmbeddingClient
import bs4
from langchain import hub
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_google_vertexai import VertexAI
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.core.config import settings
import chromadb 
from langchain_community.vectorstores.chroma import Chroma



if __name__ == "__main__":
    # Load, chunk and index the contents of the blog.
    processor = DocumentProcessor(["http://arxiv.org/pdf/1905.07844v1"])
    processor.ingest_documents()
    docs = processor.pages
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(docs)
    client = chromadb.Client()
    vectorstore = Chroma.from_documents(documents=splits, embedding=EmbeddingClient(**settings.EMBED_CONFIG), client=client)

    # Retrieve and generate using the relevant snippets of the blog.
    retriever = vectorstore.as_retriever()
    prompt = hub.pull("rlm/rag-prompt")
    llm = VertexAI(
                model_name = "gemini-pro",
                temperature = 0.8, # Increased for less deterministic questions 
                max_output_tokens = 2000,
            
            )


    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)


    rag_chain_from_docs = (
        RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
        | prompt
        | llm
        | StrOutputParser()
    )

    rag_chain_with_source = RunnableParallel(
        {"context": retriever, "question": RunnablePassthrough()}
    ).assign(answer=rag_chain_from_docs)
    
    for chunk in rag_chain_with_source.stream("What is the main theme of the article?"):
        print(chunk)