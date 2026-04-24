from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import AsyncOpenAI
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

SCRIPT_SYSTEM_PROMPT = """You are Dr. Scrypto, a script analyst. You are surgical, precise, and blunt.

Rules:
- Analyse ONLY what is on the page. Never invent or assume.
- Be specific. Reference actual characters, themes, and moments.
- Use correct screenplay terminology.
- If the script is horror, call it horror. If the tone is dark, say dark.
- Do not soften verdicts. Explain them clearly.
- No generic language. No "shadows loom" or "silence reigns".
- No poetic language. No trailer copy. Clear, direct, professional.
- Return valid JSON only. No preamble, no explanation outside the JSON."""

CONCEPT_SYSTEM_PROMPT = """You are a development executive helping a filmmaker shape their idea into a pitchable concept.
You are collaborative, constructive, and specific.
You generate professional industry-standard pitch materials from a rough idea or concept — not a finished screenplay.
Extrapolate intelligently — fill gaps creatively but stay true to the filmmaker's stated idea.
Return valid JSON only. No preamble, no explanation outside the JSON."""


def build_script_user_prompt(script_text):
    return f"""Based on this screenplay, generate pitch materials. Generate THREE options for title, logline, and tagline so the filmmaker can choose.

SCRIPT TEXT:
{script_text}

Return JSON with this exact structure:
{{
  "primaryTitle": "string — best title for this film, specific to this story",
  "altTitles": ["string", "string", "string"],
  "loglines": [
    "string — protagonist + goal + stakes + antagonistic force. Max 40 words. Format: A [protagonist] must [goal] before/or [stakes/consequence]. No adjectives unless essential.",
    "string — different angle, character-driven",
    "string — different angle, thematic"
  ],
  "taglines": [
    "string — 3-8 words. Punchy, poster-ready, no question marks, no ellipsis.",
    "string — different tone or angle",
    "string — different tone or angle"
  ],
  "synopsis": "string — 400-500 words. Full story written for a producer not a marketing team. Clear, objective, no hype language. Include setup, inciting incident, Act 2 complications, climax, resolution.",
  "genre": "string — primary genre",
  "subgenres": ["string", "string"],
  "tone": "string — single descriptive phrase maximum 4 words. Examples: dark and visceral, wry and melancholic, tense and claustrophobic. Must reflect the actual script.",
  "time_period": "string — when the story takes place",
  "setting": "string — primary location in 5 words or less"
}}"""


def build_concept_user_prompt(user_idea):
    return f"""A filmmaker has the following idea for a film:

CONCEPT:
{user_idea}

Generate professional pitch materials. Generate THREE options for title, logline, and tagline.

Return JSON with this exact structure:
{{
  "primaryTitle": "string — best title for this concept",
  "altTitles": ["string", "string", "string"],
  "loglines": [
    "string — one sentence pitch, protagonist + goal + stakes",
    "string — different angle",
    "string — different angle"
  ],
  "taglines": [
    "string — 3-8 words, poster-ready",
    "string — different tone",
    "string — different tone"
  ],
  "synopsis": "string — 300-400 words. This is a PITCH synopsis not a final story. Set up the world, character, central conflict. Leave room for the writer to develop it.",
  "genre": "string",
  "subgenres": ["string", "string"],
  "tone": "string — single phrase maximum 4 words",
  "time_period": "string",
  "setting": "string — 5 words or less"
}}"""


@app.post("/api/analyse")
async def analyse(request: Request):
    body = await request.json()
    text = body.get("text", "")

    if not text.strip():
        return JSONResponse(
            {"error": {"message": "No text provided"}},
            status_code=400,
        )

    is_script = len(text) >= 1000

    if is_script:
        system_prompt = SCRIPT_SYSTEM_PROMPT
        user_prompt = build_script_user_prompt(text[:100000])
    else:
        system_prompt = CONCEPT_SYSTEM_PROMPT
        user_prompt = build_concept_user_prompt(text)

    try:
        response = await client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            max_tokens=3000,
            temperature=0.3,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt},
            ],
        )
        result = json.loads(response.choices[0].message.content)
        return result
    except Exception as e:
        return JSONResponse(
            {"error": {"message": str(e)}},
            status_code=500,
        )


@app.get("/api/health")
async def health():
    return {"status": "ok"}
