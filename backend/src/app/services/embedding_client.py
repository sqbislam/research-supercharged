# embedding_client.py

from langchain_google_vertexai import VertexAIEmbeddings

class EmbeddingClient:
    """
    Initialize the EmbeddingClient class to connect to Google Cloud's VertexAI for text embeddings.
    """
    
    def __init__(self, model_name, project, location):
        # Initialize the VertexAIEmbeddings client with the given parameters
        self.client = VertexAIEmbeddings(model_name=model_name,project=project,location=location)
        
        
    def embed_query(self, query):
        """
        Uses the embedding client to retrieve embeddings for the given query.

        :param query: The text query to embed.
        :return: The embeddings for the query or None if the operation fails.
        """
        vectors = self.client.embed_query(query)
        return vectors
    
    def embed_documents(self, documents):
        """
        Retrieve embeddings for multiple documents.

        :param documents: A list of text documents to embed.
        :return: A list of embeddings for the given documents.
        """
        try:
            return self.client.embed_documents(documents)
        except AttributeError:
            print("Method embed_documents not defined for the client.")
            return None

