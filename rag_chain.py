from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import ChatOllama

from langchain_core.prompts import ChatPromptTemplate

from langchain_classic.chains.combine_documents import (
    create_stuff_documents_chain,
)

from langchain_classic.chains import (
    create_retrieval_chain,
)

embedding = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

vectorstore = Chroma(
    persist_directory="chroma_db",
    embedding_function=embedding
)

retriever = vectorstore.as_retriever(
    search_kwargs={"k": 3}
)

llm = ChatOllama(
    model="llama3.1:8b",
    temperature=0
)

prompt = ChatPromptTemplate.from_template(
"""
You are a Resume Assistant.

Answer ONLY from the provided context.

If the answer is not present in the context say

"I couldn't find that information in the resume."

Context:
{context}

Question:
{input}
"""
)

document_chain = create_stuff_documents_chain(
    llm,
    prompt
)

rag_chain = create_retrieval_chain(
    retriever,
    document_chain
)

print("="*60)
print("Resume RAG Assistant")
print("="*60)

while True:

    question = input("\nAsk: ")

    if question.lower() == "exit":
        break

    response = rag_chain.invoke(
        {
            "input": question
        }
    )

    print("\nAnswer:\n")
    print(response["answer"])