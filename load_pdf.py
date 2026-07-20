from langchain_community.document_loaders import PyPDFLoader

loader = PyPDFLoader("data/resume.pdf")

documents = loader.load()

print("Total Pages:", len(documents))

print()

print(documents[0].page_content[:1000])