from typing import List

import bs4, requests
import uuid

from src.db import get_collection


def clear():
  collection = get_collection()
  if collection.get()["ids"]:
    collection.delete(collection.get()["ids"])


def status():
  collection = get_collection()
  result = collection.get(where={"type": "url"})
  unique_urls = set()
  for metadata in result['metadatas']:
    unique_urls.add(metadata['url'])
  return unique_urls


def insert(urls: List[str]):
  inserted_urls = []
  for url in urls:
    url = url.strip()
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    print(f"Response: {response.status_code}, url: {url}")
    if response.ok:
      soup = bs4.BeautifulSoup(response.text, 'lxml')

      content = soup.body.get_text(' ', strip=True)

      def splitter(n, s):
        pieces = s.split()
        return (" ".join(pieces[i:i + n]) for i in range(0, len(pieces), n))

      splitted = list(splitter(50, content))

      collection = get_collection()

      try:
        existing = collection.get(where={
          'url': url
        })

        if existing['ids']:
          print("Remove existing metadata")
          collection.delete(existing['ids'])

        collection.add(
          documents=[splitt_ for splitt_ in splitted],
          metadatas=[
            {
              "type": "url",
              "url": url
            }
            for _ in splitted],
          ids=[str(uuid.uuid4()) for _ in splitted]
        )

        inserted_urls.append(url)

      except Exception as e:
        print(e)

  return inserted_urls


def query(texts: List[str],
          results: int = 3):
  collection = get_collection()

  query_results = collection.query(
    query_texts=texts,
    n_results=results,
  )

  result = []
  for query_result in range(0, len(query_results['documents'][0])):
    result.append(
      {
        'metadata': query_results['metadatas'][0][query_result],
        'document': query_results['documents'][0][query_result],
        'distance': query_results['distances'][0][query_result]
      }
    )
  return result
