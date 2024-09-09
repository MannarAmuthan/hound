from flask import Flask, request

from src.chat import chat
from src.scannar import get_urls
from src.url import insert, query, clear, status

app = Flask(__name__)


@app.route("/text", methods=['POST'])
def text():
  try:
    body = request.get_json(force=True)
    urls = get_urls(body['content'].strip())
    print(f"Urls , {len(urls)} {','.join(urls)}")
    inserted_urls = insert(urls)
    return {"urls": inserted_urls}
  except Exception as exception:
    print(exception)
    raise Exception("Service not available")


@app.route("/text/clear", methods=['POST'])
def text_clear():
  clear()
  return "Done"


@app.route("/text/query", methods=['POST'])
def text_query():
  body = request.get_json(force=True)
  results = query(body['content'])
  return results


@app.route("/text/status", methods=['GET'])
def text_status():
  urls = status()
  return {"count": len(urls), "urls": list(urls)}


@app.route("/chat", methods=['POST'])
def chat_():
  question = request.get_json(force=True)
  results = query(question['content'])

  response = chat(question['content'], [doc['document'] for doc in results])
  return {"response": response}


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8000, debug=True)
