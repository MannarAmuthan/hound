import chromadb
from chromadb.utils import embedding_functions

CHROMA_DATA_PATH = "data/"
EMBED_MODEL = "msmarco-distilbert-base-dot-prod-v3"
COLLECTION_NAME = "main"

client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)


def get_collection():
  try:
    embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
      model_name=EMBED_MODEL
    )
    return client.get_collection(
      COLLECTION_NAME,
      embedding_function=embedding_func
    )
  except ValueError:
    embedding_func = embedding_functions.SentenceTransformerEmbeddingFunction(
      model_name=EMBED_MODEL
    )
    return client.create_collection(
      name=COLLECTION_NAME,
      metadata={"hnsw:space": "cosine"},
      embedding_function=embedding_func
    )
