from typing import List

import ollama

def chat(question: str,
         contexts: List[str]):
  query = [{
    'role': 'user',
    'content': f"Contexts:{contexts}, Question: {question}"
  }]

  stream = ollama.chat(
    model='gemma2',
    messages= query,
    stream=True,
  )

  message = []

  def process_message(_stream):
    current_response = ""
    for chunk in _stream:
      print(chunk['message']['content'], end='', flush=True)
      current_response += chunk['message']['content']
    print("\n")

    message.append(current_response)

  process_message(stream)

  return " ".join(message)


