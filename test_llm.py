from llm import llm

response = llm.invoke("Introduce yourself in one paragraph.")

print(response.content)