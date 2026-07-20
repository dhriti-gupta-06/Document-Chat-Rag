from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from embedding import get_embedding
from vector_db import add_documents

loader = PyPDFLoader("data/resume.pdf")

documents = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

chunks = splitter.split_documents(documents)

ids = []
texts = []
embeddings = []

for i, chunk in enumerate(chunks):

    ids.append(str(i))

    texts.append(chunk.page_content)

    embeddings.append(
        get_embedding(chunk.page_content)
    )

add_documents(
    ids,
    texts,
    embeddings
)

print("Total Chunks:", len(chunks))
print("Stored successfully in ChromaDB.")