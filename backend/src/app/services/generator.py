
import os
import sys
import json
import re
sys.path.append(os.path.abspath('../../'))

from langchain_core.prompts import PromptTemplate
from langchain_google_vertexai import VertexAI

class QuizGenerator:
    def __init__(self, topic=None, num_questions=1, vectorstore=None):
        """
        Initializes the QuizGenerator with a required topic, the number of questions for the quiz,
        and an optional vectorstore for querying related information.

        :param topic: A string representing the required topic of the quiz.
        :param num_questions: An integer representing the number of questions to generate for the quiz, up to a maximum of 10.
        :param vectorstore: An optional vectorstore instance (e.g., ChromaDB) to be used for querying information related to the quiz topic.
        """
        if not topic:
            self.topic = "General Knowledge"
        else:
            self.topic = topic

        if num_questions > 10:
            raise ValueError("Number of questions cannot exceed 10.")
        self.num_questions = num_questions

        self.vectorstore = vectorstore
        self.llm = None
        self.question_bank = [] # Initialize the question bank to store questions
        self.system_template = """
            You are a subject matter expert on the topic: {topic}
            
            Follow the instructions to create a quiz question:
            1. Generate a question based on the topic provided and context as key "question"
            2. Provide 4 multiple choice answers to the question as a list of key-value pairs "choices"
            3. Provide the correct answer for the question from the list of answers as key "answer"
            4. Provide an explanation as to why the answer is correct as key "explanation"
            
            You must respond as a JSON object with the following structure. Do not include any trailing or leading character before or after the curly braces "{{}}":
            {{
                "question": "<question>",
                "choices": [
                    {{"key": "A", "value": "<choice>"}},
                    {{"key": "B", "value": "<choice>"}},
                    {{"key": "C", "value": "<choice>"}},
                    {{"key": "D", "value": "<choice>"}}
                ],
                "answer": "<answer key from choices list>",
                "explanation": "<explanation as to why the answer is correct>"
            }}
            
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
            max_output_tokens = 500
        )

    def clean_json_string(self, json_str):
        """Clean JSON String capturing only the value between curly braces

        Args:
            json_str (str): uncleaned string 

        Returns:
            str: cleaned string
        """
        # Define a regex pattern to match everything before and after the curly braces
        pattern = r'^.*?({.*}).*$'
        # Use re.findall to extract the JSON part from the string
        matches = re.findall(pattern, json_str, re.DOTALL)
        if matches:
            # If there's a match, return the first one (should be the JSON)
            return matches[0]
        else:
            # If no match is found, return None
            return None
    
    async def generate_question_with_vectorstore(self):
        """
        Generates a quiz question based on the topic provided using a vectorstore

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
        # Create a chain with the Retriever, PromptTemplate, and LLM
        chain = setup_and_retrieval | prompt | self.llm 

        # Invoke the chain with the topic as input
        response = chain.invoke(self.topic)
        return response

    async def generate_quiz(self) -> list:
        """
        Generate a list of unique quiz questions based on the specified topic and number of questions.
        """
        self.question_bank = [] # Reset the question bank

        for _ in range(self.num_questions):
            question_str = await self.generate_question_with_vectorstore()
            try:
                # Convert the JSON String to a dictionary
                cleaned_str = self.clean_json_string(question_str)
                question=json.loads(cleaned_str)
            except json.JSONDecodeError:
                print("Failed to decode question JSON.")
                continue  # Skip this iteration if JSON decoding fails
 
            # Validate the question using the validate_question method
            if self.validate_question(question):
                print("Successfully generated unique question")
                # Add the valid and unique question to the bank
                self.question_bank.append(question)
            else:
                print("Duplicate or invalid question detected.")
      

        return self.question_bank

    def validate_question(self, question: dict) -> bool:
        """
        Validate a quiz question for uniqueness within the generated quiz.

        Parameters:
        - question: A dictionary representing the generated quiz question, expected to contain at least a "question" key.

        Returns:
        - A boolean value: True if the question is unique, False otherwise.

        """

        # Check if a question with the same text already exists in the self.question_bank
        is_unique = question.get("question",'') not in [qn["question"] for qn in self.question_bank]

        return is_unique
