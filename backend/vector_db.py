# from langchain_chroma import Chroma
# from langchain_huggingface import HuggingFaceEmbeddings

# embedding = HuggingFaceEmbeddings(
#     model_name="sentence-transformers/all-MiniLM-L6-v2"
# )

# vectorstore = Chroma(
#     persist_directory="chroma_db",
#     embedding_function=embedding
# )


# def add_documents(documents):
#     """
#     Store LangChain Document objects in ChromaDB.
#     """
#     vectorstore.add_documents(documents)


# def get_retriever(document_id=None, k=3):
#     """
#     Return a retriever.
#     If document_id is given, retrieve only from that document.
#     """

#     if document_id is None:
#         return vectorstore.as_retriever(
#             search_kwargs={"k": k}
#         )

#     return vectorstore.as_retriever(
#         search_kwargs={
#             "k": k,
#             "filter": {
#                 "document_id": document_id
#             }
#         }
#     )


# def delete_document(document_id):
#     """
#     Delete all chunks belonging to one document.
#     """

#     vectorstore.delete(
#         where={
#             "document_id": document_id
#         }
#     )



from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embedding
)


def add_documents(documents):
    vectorstore.add_documents(documents)


def similarity_search(query, document_id, k=3):

    return vectorstore.similarity_search(
        query=query,
        k=k,
        filter={
            "document_id": document_id
        }
    )


def delete_document(document_id):

    vectorstore.delete(
        where={
            "document_id": document_id
        }
    )