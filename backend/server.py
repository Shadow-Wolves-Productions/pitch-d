from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import httpx
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/analyse")
async def analyse(request: Request):
    body = await request.json()
    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        return JSONResponse(
            {"error": {"message": "API key not configured on server"}},
            status_code=500,
        )

    # Extract messages from Anthropic-formatted request body
    messages = body.get("messages", [])
    max_tokens = body.get("max_tokens", 2048)

    openai_body = {
        "model": "gpt-4o",
        "messages": messages,
        "max_tokens": max_tokens,
        "temperature": 0.7,
    }

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json=openai_body,
        )

    openai_data = response.json()

    if "error" in openai_data:
        return JSONResponse(
            {"error": openai_data["error"]},
            status_code=response.status_code,
        )

    # Convert OpenAI response back to Anthropic format so frontend works unchanged
    content_text = (
        openai_data.get("choices", [{}])[0]
        .get("message", {})
        .get("content", "")
    )

    return {"content": [{"type": "text", "text": content_text}]}


@app.get("/api/health")
async def health():
    return {"status": "ok"}
