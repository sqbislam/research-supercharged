# pdf_processing.py

# Necessary imports
import logging
from langchain_community.document_loaders import PDFMinerLoader
import uuid

from langchain_text_splitters import RecursiveCharacterTextSplitter

class DocumentProcessor:
    """
    This class encapsulates the functionality for processing uploaded PDF documents using Streamlit
    and Langchain's PyPDFLoader. It provides a method to render a file uploader widget, process the
    uploaded PDF files, extract their pages, and display the total number of pages extracted.
    """
    def __init__(self, urls=[], pages=None):
        self.pages = []  # List to keep track of pages from all documents
        self.urls = urls   # List to keep track of URLs from all documents
        
    
    def ingest_documents(self):
        """
        Get the online PDFs and 
        extracts their pages, and updates the self.pages list with the total number of pages.
     
        """
        # Read the PDF files from URLs      
        if self.urls is not None:
            for url in self.urls:
                logging.info("Processing document from URL... ")
              
                # Step 2: Process the temporary file
                try:
                    loader = PDFMinerLoader(url)
                    extracted_pages = loader.load_and_split(RecursiveCharacterTextSplitter(chunk_size=2000))
                    logging.info(f"Loaded {len(extracted_pages)} pages from {url}")
                except Exception as e:
                    print(f"Error loading {url}")
                    continue
                
                # Step 3: Then, Add the extracted pages to the 'pages' list.
                self.pages.extend(extracted_pages)
          


