from vector_db import add_document, search_documents

# Add sample documents
add_document(
    "1",
    "Python is used for Machine Learning and Data Science."
)

add_document(
    "2",
    "Java is widely used in Backend Development."
)

add_document(
    "3",
    "LangChain helps build Retrieval Augmented Generation applications."
)

# Search
results = search_documents("Machine Learning")

print(results)