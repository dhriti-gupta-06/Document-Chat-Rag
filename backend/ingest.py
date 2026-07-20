from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from vector_db import add_documents


def ingest_document(file_path, document_id):

    # Load PDF
    loader = PyPDFLoader(file_path)
    documents = loader.load()

    # Split into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_documents(documents)

    # Add metadata to every chunk
    for chunk in chunks:

        chunk.metadata["document_id"] = document_id
        chunk.metadata["filename"] = file_path.split("\\")[-1]

    # Store in Chroma
    add_documents(chunks)

    return {
        "pages": len(documents),
        "chunks": len(chunks)
    }