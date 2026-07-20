from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

# Load PDF
loader = PyPDFLoader("data/resume.pdf")
documents = loader.load()

print("Total Pages:", len(documents))

# Split into chunks
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)

chunks = text_splitter.split_documents(documents)

print("Total Chunks:", len(chunks))

print("\nFirst Chunk:\n")
print(chunks[0].page_content)

print("\nMetadata:\n")
print(chunks[0].metadata)