# DocuMind | AI-Powered PDF Chat Using RAG

**Chat with your PDFs using Retrieval-Augmented Generation (RAG).**

DocuMind is a full-stack document question-answering application that allows users to upload PDF files and ask questions about their contents through a conversational interface. It uses semantic search to retrieve relevant document passages and a locally hosted large language model to generate context-grounded answers.

The application combines **React, FastAPI, LangChain, ChromaDB, Hugging Face embeddings, and Ollama** to provide a local document chat experience without requiring a cloud LLM API key.

## ✨ Features

- **PDF Upload:** Upload PDF documents through the web interface.
- **AI-Powered Question Answering:** Ask natural-language questions about an uploaded document.
- **Retrieval-Augmented Generation:** Retrieve relevant text chunks before generating an answer.
- **Semantic Search:** Find relevant content using vector embeddings rather than exact keyword matching.
- **Document Isolation:** Restrict retrieval to the currently selected document using metadata filtering.
- **Chat History:** Store and retrieve previous question-answer conversations.
- **Document Management:** View uploaded documents and their metadata, including page and chunk counts.
- **Document Deletion:** Remove a document and its associated vectors, metadata, and chat history.
- **Local LLM Inference:** Generate answers using Ollama without a cloud API key.
- **Interactive UI:** Use a React-based interface with upload progress, notifications, and Markdown-rendered responses.

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite |
| Styling | Tailwind CSS |
| Backend | Python, FastAPI |
| API Communication | REST API, Axios |
| AI Orchestration | LangChain |
| PDF Text Extraction | PyPDFLoader |
| Text Chunking | RecursiveCharacterTextSplitter |
| Embedding Model | `sentence-transformers/all-MiniLM-L6-v2` |
| Vector Database | ChromaDB |
| Large Language Model | Llama 3.1 8B |
| Local Model Runtime | Ollama |
| Relational Database | SQLite |
| API Server | Uvicorn |

## 🏗️ System Architecture

DocuMind follows a three-tier architecture consisting of the frontend, backend, and data storage layers.

```text
                    USER
                      |
                      v
             React + Vite Frontend
                      |
                REST API / Axios
                      |
                      v
               FastAPI Backend
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       SQLite      ChromaDB     uploads/
     Metadata &    Vectors       PDF Files
     Chat History      |
                       v
                 Semantic Search
                       |
                       v
                 Retrieved Text
                       |
                       v
                LangChain Prompt
                       |
                       v
                 Ollama Runtime
                  llama3.1:8b
                       |
                       v
                 Generated Answer
                       |
                       v
                  React Chat UI
```

## 🔄 How It Works

### 1. Document Ingestion

1. The user uploads a PDF through the React frontend.
2. FastAPI validates the upload and saves the PDF.
3. LangChain's `PyPDFLoader` extracts text from the document.
4. `RecursiveCharacterTextSplitter` divides the text into chunks of approximately 500 characters with 100 characters of overlap.
5. Hugging Face embeddings convert each chunk into a 384-dimensional vector.
6. ChromaDB stores the vectors with document metadata for filtered retrieval.
7. SQLite stores document information, including the filename, page count, and chunk count.

### 2. Question Answering

1. The user selects a document and submits a question.
2. The backend converts the question into an embedding using the same embedding model.
3. ChromaDB retrieves the three most similar chunks belonging to the selected document.
4. LangChain combines the retrieved passages and question into a prompt.
5. Ollama runs `llama3.1:8b` to generate a response using the supplied context.
6. FastAPI stores the conversation in SQLite and returns the answer to the frontend.

This architecture helps the application answer questions about uploaded files without passing the entire document to the language model.

## 📁 Project Structure

```text
RagUsingLangchain/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── ingest.py
│   ├── vector_db.py
│   ├── rag_chain.py
│   ├── llm.py
│   ├── embedding.py
│   ├── pdf_loader.py
│   ├── splitter.py
│   ├── test_ingest.py
│   ├── check_chroma.py
│   ├── uploads/
│   ├── chroma_db/
│   └── document_chat.db
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── upload/
│   │   │   ├── documents/
│   │   │   └── chat/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Note: `chroma_db/`, `document_chat.db`, and uploaded files are runtime-generated data and may not be present in a fresh clone.*

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Python 3.11 or another Python version compatible with the project's dependencies
- Node.js and npm
- Git
- Ollama

The Llama 3.1 8B model and the embedding model require additional disk space and processing resources. A machine with 16 GB RAM is recommended for a more comfortable local development experience.

### Step 1: Clone the Repository

```bash
git clone https://github.com/dhriti-gupta-06/RagUsingLangchain.git
cd RagUsingLangchain
```

### Step 2: Set Up the Backend

Open a terminal in the project root and run:

```powershell
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can run the environment's Python executable directly instead.

Install the required Python packages:

```bash
python -m pip install --upgrade pip
python -m pip install fastapi "uvicorn[standard]" python-multipart pydantic langchain-core langchain-community langchain-text-splitters langchain-chroma langchain-huggingface langchain-ollama sentence-transformers pypdf
```

These are the dependencies inferred from the project's documented imports. If the repository contains a `requirements.txt`, prefer installing from that file and ensure it includes all required packages.

```bash
python -m pip install -r requirements.txt
```

### Step 3: Install and Configure Ollama

Install Ollama from its official website:

https://ollama.com/

Download the required model:

```bash
ollama pull llama3.1:8b
```

Verify that the model is available:

```bash
ollama list
```

Start Ollama if it is not already running, then test the model:

```bash
ollama run llama3.1:8b
```

The application uses a local Ollama instance for answer generation, so the runtime must remain available while chatting.

### Step 4: Start the Backend Server

From the `backend/` directory, run:

```powershell
python -m uvicorn main:app --reload
```

The backend should be accessible at:

- API base URL: http://127.0.0.1:8000
- Interactive API documentation: http://127.0.0.1:8000/docs

Keep this terminal running.

### Step 5: Set Up the Frontend

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, typically:

http://localhost:5173

The frontend API configuration in `frontend/src/services/api.js` uses `http://127.0.0.1:8000` during local development.

### Step 6: Use DocuMind

1. Open the frontend in your browser.
2. Upload a text-based PDF.
3. Wait for document processing and indexing to finish.
4. Select the uploaded document.
5. Ask questions related to its content.
6. Review the generated answers and continue the conversation.
7. Delete the document when it is no longer needed.

## 🔌 API Endpoints

The FastAPI backend exposes the following endpoints.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Check API availability |
| `POST` | `/upload` | Upload and index a PDF |
| `GET` | `/documents` | Retrieve uploaded document metadata |
| `POST` | `/chat` | Ask a question about a selected document |
| `GET` | `/chat-history/{document_id}` | Retrieve conversation history |
| `DELETE` | `/document/{document_id}` | Delete a document and related data |

For request formats, validation requirements, and response schemas, open the FastAPI documentation at `/docs` while the backend is running.

## 🗄️ Data Storage

DocuMind uses separate storage mechanisms for different responsibilities.

- **SQLite:** Stores document metadata and question-answer history.
- **ChromaDB:** Stores vector embeddings and metadata used for semantic retrieval.
- **Local filesystem:** Stores uploaded PDF files.

The embedding model used during indexing must match the model used during question retrieval. Changing the embedding configuration may require rebuilding the vector index.

## ⚠️ Limitations

- Supports PDF files only.
- Scanned PDFs without an extractable text layer are not supported because OCR is not implemented.
- Resume-specific field extraction is not implemented. Resumes are processed as ordinary PDFs.
- Responses depend on the quality of extracted text and retrieved passages.
- Retrieval is currently limited to three chunks per question.
- Local LLM inference can be slow depending on available RAM, CPU, and GPU resources.
- User authentication and role-based access control are not implemented.
- The current application is designed as a local development prototype rather than a production-hardened service.
- Automated unit and integration test suites are not included in the current implementation.

## 🚀 Future Improvements

Potential improvements include:

- OCR support for scanned PDFs.
- Hybrid retrieval combining semantic and keyword search.
- Reranking retrieved passages to improve relevance.
- Source citations with page numbers in generated answers.
- Configurable chunk sizes and retrieval parameters.
- Streaming responses for a more responsive chat experience.
- User authentication and access control.
- Automated backend and frontend testing.
- Cloud deployment and production configuration.

## 🎓 Learning Outcomes

This project demonstrates practical implementation of:

- Full-stack application development using React and FastAPI.
- REST API design and frontend-backend integration.
- Retrieval-Augmented Generation and semantic search.
- Vector embeddings and ChromaDB integration.
- Local LLM deployment with Ollama.
- Document processing, chunking, and prompt engineering.
- Relational data persistence using SQLite.
- Modular software architecture and debugging.

## 👩‍💻 Author

**Dhriti Gupta**

B.Tech Computer Science and Engineering

GitHub: [@dhriti-gupta-06](https://github.com/dhriti-gupta-06)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
