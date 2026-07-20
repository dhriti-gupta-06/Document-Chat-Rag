from langchain_core.prompts import ChatPromptTemplate

from llm import llm
from vector_db import similarity_search


prompt = ChatPromptTemplate.from_template(
"""
You are an intelligent Document Assistant.

Answer ONLY from the context.

If the answer is not found, reply:

"I couldn't find that information in the document."

Context:

{context}

Question:

{question}
"""
)


def ask_document(question, document_id):

    docs = similarity_search(
        question,
        document_id
    )

    context = "\n\n".join(
        doc.page_content
        for doc in docs
    )

    chain = prompt | llm

    response = chain.invoke(
        {
            "context": context,
            "question": question
        }
    )

    return response.content