from embedding import get_embedding
from vector_db import search_documents


def retrieve(query):

    query_embedding = get_embedding(query)

    results = search_documents(
        query_embedding,
        top_k=3
    )

    documents = results["documents"][0]

    return "\n\n".join(documents)