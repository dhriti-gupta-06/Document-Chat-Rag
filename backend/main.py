from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ChatRequest
from vector_db import delete_document
from rag_chain import ask_document
import shutil
import os
from datetime import datetime

from database import (
    initialize_database,
    get_connection
)

from ingest import ingest_document

app = FastAPI(
    title="Document Chat RAG API",
    version="1.0"
)

initialize_database()

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "message": "Document Chat RAG Backend Running"
    }


@app.post("/upload")
async def upload_pdf(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    filepath = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO Documents
        (
            filename,
            filepath,
            pages,
            chunks,
            uploaded_at
        )

        VALUES
        (?, ?, ?, ?, ?)
        """,

        (
            file.filename,
            filepath,
            0,
            0,
            datetime.now().strftime("%d-%m-%Y %H:%M")
        )
    )

    conn.commit()

    document_id = cursor.lastrowid

    result = ingest_document(
        filepath,
        document_id
    )

    cursor.execute(
        """
        UPDATE Documents

        SET
            pages=?,
            chunks=?

        WHERE id=?
        """,

        (
            result["pages"],
            result["chunks"],
            document_id
        )
    )

    conn.commit()

    conn.close()

    return {

        "success": True,

        "document_id": document_id,

        "filename": file.filename,

        "pages": result["pages"],

        "chunks": result["chunks"]

    }
@app.get("/documents")
def get_documents():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM Documents
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    conn.close()

    return {
        "success": True,
        "documents": [dict(row) for row in rows]
    }
@app.post("/chat")
def chat(request: ChatRequest):

    answer = ask_document(
        request.question,
        request.document_id
    )

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO ChatHistory
        (
            document_id,
            question,
            answer,
            created_at
        )

        VALUES
        (?, ?, ?, datetime('now'))
        """,
        (
            request.document_id,
            request.question,
            answer
        )
    )

    conn.commit()

    conn.close()

    return {

        "success": True,

        "answer": answer

    }
@app.delete("/document/{document_id}")
def delete_pdf(document_id: int):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT filepath
        FROM Documents
        WHERE id=?
        """,
        (document_id,)
    )

    row = cursor.fetchone()

    if row is None:

        conn.close()

        raise HTTPException(
            status_code=404,
            detail="Document not found."
        )

    filepath = row["filepath"]

    # Delete from Chroma
    delete_document(document_id)

    # Delete PDF
    if os.path.exists(filepath):
        os.remove(filepath)

    # Delete Chat History
    cursor.execute(
        """
        DELETE FROM ChatHistory
        WHERE document_id=?
        """,
        (document_id,)
    )

    # Delete Document
    cursor.execute(
        """
        DELETE FROM Documents
        WHERE id=?
        """,
        (document_id,)
    )

    conn.commit()

    conn.close()

    return {
        "success": True,
        "message": "Document deleted successfully."
    }

@app.get("/chat-history/{document_id}")
def get_chat_history(document_id: int):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT question, answer
        FROM ChatHistory
        WHERE document_id = ?
        ORDER BY id ASC
        """,
        (document_id,)
    )

    rows = cursor.fetchall()

    conn.close()

    messages = []

    for row in rows:

        messages.append({
            "role": "user",
            "message": row["question"]
        })

        messages.append({
            "role": "assistant",
            "message": row["answer"]
        })

    return {
        "success": True,
        "messages": messages
    }