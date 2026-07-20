from embedding import get_embedding

embedding = get_embedding("Python developer with machine learning")

print(type(embedding))
print(len(embedding))
print(embedding[:10])