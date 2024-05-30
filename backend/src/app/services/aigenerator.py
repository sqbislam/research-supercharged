

import json
import logging
import re

from langchain_core.prompts import PromptTemplate
from langchain_google_vertexai import VertexAI

class AIGenerator:
    def __init__(self, vectorstore=None):
        """
        Initializes the QuizGenerator with a required topic, the number of questions for the quiz,
        and an optional vectorstore for querying related information.

        :param topic: A string representing the required topic of the quiz.
        :param num_questions: An integer representing the number of questions to generate for the quiz, up to a maximum of 10.
        :param vectorstore: An optional vectorstore instance (e.g., ChromaDB) to be used for querying information.
        """

        self.vectorstore = vectorstore
        self.llm = None
        self.question_bank = [] # Initialize the question bank to store questions
        self.system_template = """
            You are a research expert with extensive knowledge and experience. You have great writing skills and can generate high-quality content. 
            You have been asked to create an overall summary of the given articles. Consisting of a summary of the key points, 
            limitations of the studies, recommendations for future research and best results achieved so far and techniques used.
            
            Follow the instructions to create summary:
            1. Generate a summary of key points based on the context articles
            2. Write the limitations of the studies from the context articles
            3. Write the scopes for future research based on the context articles
            4. Generate an overall summary of the results and findings, include the best results and techniques used to achieve them based on the context articles
            
            You must respond as in markdown format structure. Do not include any information other than that present in the context please. 
            Elaborate your response in the given keys.
            
            **Summary**: <summary> \n
            **Limiations**: <limitations> \n 
            **Recommendations**: <recommendations> \n
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
            temperature = 0.5, # Increased for less deterministic questions 
            max_output_tokens = 2000
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
        print(self.responses)
        return self.clean_response(self.responses)
    
    def clean_response(self, response):
        """
        Clean the response from the model
        """
        ## Add a new line before every ##
        response = re.sub(r'##', '\n##', response).replace("* ", "- ")
        
        return response

