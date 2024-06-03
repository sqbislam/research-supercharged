
import logging
import re
import chromadb 

from app.services.embedding_client import EmbeddingClient
from langchain_core.prompts import PromptTemplate
from langchain_google_vertexai import VertexAI
from langchain_core.output_parsers import StrOutputParser
from langchain import hub
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.services.embedding_client import EmbeddingClient
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.core.config import settings
from langchain_community.vectorstores.chroma import Chroma


class AIGenerator:
    def __init__(self, vectorstore=None, chroma_db=None):
        """
        Initializes the QuizGenerator with a required topic, the number of questions for the quiz,
        and an optional vectorstore for querying related information.

        :param topic: A string representing the required topic of the quiz.
        :param num_questions: An integer representing the number of questions to generate for the quiz, up to a maximum of 10.
        :param vectorstore: An optional vectorstore instance (e.g., ChromaDB) to be used for querying information.
        """
        self.chroma_db = chroma_db
        self.vectorstore = vectorstore
        self.llm = None
        self.question_bank = [] # Initialize the question bank to store questions
        self.system_template = """
            You are a research expert with extensive knowledge and experience. You have great writing skills and can generate high-quality content. You elaborate as much as possible.
            You have been asked to create an detailed description of the given articles. Elaborate on the details. Consisting of a summary of the key points,  literature review, prior work, the current state of the art, previous research,
            limitations of the studies, recommendations for future research, experiments they used, evaluation metrics they used and best results achieved so far and techniques used. (Elaborate on the details as much as possible).
            
            Follow the instructions to create the response:
            1. Generate a summary of key points based on the context articles
            2. Previous work and literature review based on the context articles
            3. Write the limitations of the studies from the context articles
            4. Write the scopes for future research based on the context articles
            5. Write the experiments they used and results from the context articles
            6. Generate an overall summary of the results and findings, include the best results and techniques used to achieve them based on the context articles
            
            You must respond in markdown format structure. Do not include any information other than that present in the context please. 
            Elaborate your response in the given keys.
            
            **Summary**: <summary> \n
            **Literature Review**: <literature_review> \n
            **Limiations**: <limitations> \n 
            **Recommendations**: <recommendations> \n
            **Experiments**: <experiments> \n
            **Results**: <results> \n
            
            Context: {context}
            """
    
    def init_llm(self):
        """
        Initializes and configures the Large Language Model (LLM) for generating quiz questions.

        This method should handle any setup required to interact with the LLM, including authentication,
        setting up any necessary parameters, or selecting a specific model.

        :return: An instance or configuration for the LLM.
        """
        self.llm = VertexAI(
            model_name = "gemini-pro",
            temperature = 0.8, # Increased for less deterministic questions 
            max_output_tokens = 2000,
        
        )
    

    def generate_summary_with_vectorstore(self):
        """
        Generates a summary provided using a vectorstore

        :return: A JSON object representing the generated quiz question.
        """
        if not self.llm:
            self.init_llm()
        if not self.vectorstore:
            raise ValueError("Vectorstore not provided.")
        
        from langchain_core.runnables import RunnablePassthrough, RunnableParallel

        # Enable a Retriever
        retriever = self.vectorstore.as_retriever()
        
        # Use the system template to create a PromptTemplate
        prompt = PromptTemplate.from_template(self.system_template)
        
        # RunnableParallel allows Retriever to get relevant documents
        # RunnablePassthrough allows chain.invoke to send self.topic to LLM
        setup_and_retrieval = RunnableParallel(
            {"context": retriever, "topic": RunnablePassthrough()}
        )
        logging.info("Generating summary using vectorstore...")
        # Create a chain with the Retriever, PromptTemplate, and LLM
        chain = setup_and_retrieval | prompt | self.llm 

        # Invoke the chain with the topic as input
        response = chain.invoke("Researcher")
        return response

    def generate_summary(self) -> list:
        """
        Generate a Summary
        """
        self.responses = self.generate_summary_with_vectorstore()
        return self.clean_response(self.responses)
    
    def clean_response(self, response):
        """
        Clean the response from the model
        """
        ## Add a new line before every ##
        response = re.sub(r'##', '\n##', response).replace("* ", "- ").replace("**",  "*")
        
        return response
    
    
    
    ## Chat Stream Generation
    def format_docs(self, docs):
        return "\n\n".join(doc.page_content for doc in docs)
    
    ## Chat Stream Generation using chain
    async def get_conversation_retriever_chain(self, prompt=''):
        # Enable a Retriever
        llm =VertexAI(
            model_name = "gemini-pro",
            temperature = 0.7, # Increased for less deterministic questions 
            max_output_tokens = 3000,
        
        )
        retriever = self.chroma_db.as_retriever(k=4)

        
        rag_chain_from_docs = (
            RunnablePassthrough.assign(context=(lambda x: self.format_docs(x)))
            | prompt
            | llm
            | StrOutputParser()
        )

        rag_chain_with_source = RunnableParallel(
            {"context": lambda x: retriever, "question": RunnablePassthrough()}
        ).assign(answer=rag_chain_from_docs)
        return rag_chain_with_source
        
    async def generate_chat_stream(self, document_processor = None):
        """
        Generate a chat stream
        """
        
        if not document_processor:
            raise ValueError("Document Processor not provided.")
        
        docs = await document_processor.ingest_documents_for_chat()
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
                    max_output_tokens =2000,
                    streaming=True
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
        

        return rag_chain_with_source
        