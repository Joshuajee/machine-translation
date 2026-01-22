from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datamodel import TranslateRequest
from transformers import pipeline


checkpoint_path = "./models/en-urh-byt5-base-ep30-11"
english_to_urhobo = pipeline("translation", model=checkpoint_path, device=0)

app = FastAPI()

# Allow React (usually running on port 5173 for Vite) to access the API
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/translate")
def translate_english_to_urhobo(translateRequest: TranslateRequest):
    translate_prefix = "translate English to Urhobo: "
    text = f"{translate_prefix} {translateRequest.text}"
    results = english_to_urhobo(text, max_length=400)
    return {
        "status": "success",
        "translation":  results[0]["translation_text"]
    }

