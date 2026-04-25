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

SCRIPT_SYSTEM_PROMPT = """You are Dr. Scrypto, a professional script analyst and film development consultant. You are surgical, precise, and blunt. You read scripts with commercial intelligence and industry accuracy.

RULES:
- Analyse ONLY what is on the page. Never invent or assume.
- Be specific. Reference actual characters, names, themes, and moments.
- Use correct screenplay terminology.
- If the script is horror, call it horror. If the tone is dark, say dark.
- No generic language. No "shadows loom" or "silence reigns" or "malevolent force".
- No poetic language. No trailer copy. Clear, direct, professional.
- Return valid JSON only. No preamble, no explanation outside the JSON.

STEP 1 — EXTRACT before generating anything:
- Every character name EXACTLY as written
- Every relationship EXACTLY as written
- The specific genre(s)
- The specific tone in 3-4 words
- The inciting incident
- The actual stakes
- The primary setting and time period
- 1-3 core themes as single words or short phrases
- Two comparable films this resembles in tone, genre, or concept
- The most likely format (Feature Film, Short Film, TV Series, Mini-Series, Documentary)
- Estimated budget tier based on locations, cast size, and production requirements
- Target audience — specific, demographic, platform-aware

STEP 2 — GENERATE using ONLY what you extracted. Never invent character names or plot details.

TITLES:
- primaryTitle: best festival-worthy title for this specific story
- altTitles: three alternatives, equally specific, not generic

LOGLINES (3):
- One sentence each, max 40 words
- Format: When [specific inciting incident + real character name], [protagonist + specific flaw] must [concrete objective] before [specific stakes]
- Three genuinely different angles: commercial, character-driven, thematic
- Banned: malevolent, lurking, sinister, mysterious, haunting, unseen force, growing darkness

TAGLINES (3):
- Under 10 words each
- Festival poster quality
- Banned: "or perish", "face your fears", "not all monsters", "silence is deadly", "will they survive"

SYNOPSIS:
- 3-4 sentences, active voice, present tense
- Name actual characters and relationships
- Setup, conflict, escalating stakes — no spoilers
- No passive constructions, no flowery language

Return ONLY this exact JSON structure, nothing else:
{
  "primaryTitle": "string",
  "altTitles": ["string", "string", "string"],
  "loglines": ["string", "string", "string"],
  "taglines": ["string", "string", "string"],
  "synopsis": "string",
  "genre": ["string", "string"],
  "tone": "string — max 4 words e.g. dark and visceral",
  "themes": ["string", "string"],
  "setting": "string — 5 words or less",
  "period": "string — e.g. Present Day, 1980s",
  "format": "string — Feature Film / Short Film / TV Series / Mini-Series / Documentary",
  "estimatedBudget": "string — tier only e.g. Low-Mid",
  "estimatedBudgetRange": "string — e.g. $500K-$2M AUD",
  "comparableA": "string — first comparable film title only",
  "comparableB": "string — second comparable film title only",
  "targetAudience": "string — 50-80 words, specific demographics, platform fit, comparable audience"
}"""

CONCEPT_SYSTEM_PROMPT = """You are a development executive helping a filmmaker shape their idea into a pitchable concept.
You are collaborative, constructive, and specific.
You generate professional industry-standard pitch materials from a rough idea or concept — not a finished screenplay.
Extrapolate intelligently — fill gaps creatively but stay true to the filmmaker's stated idea.
Return valid JSON only. No preamble, no explanation outside the JSON."""

RANDOMISE_INSTRUCTION = "\n\nGenerate fresh, creative options. Do not repeat titles or phrases from previous responses. Vary your approach each time."


def build_script_user_prompt(script_text):
    return f"""Based on this screenplay, generate pitch materials. Generate THREE options for title, logline, and tagline so the filmmaker can choose.

SCRIPT TEXT:
{script_text}

Return the JSON structure as specified in your instructions.{RANDOMISE_INSTRUCTION}"""


def build_concept_user_prompt(user_idea):
    return f"""A filmmaker has the following idea for a film:

CONCEPT:
{user_idea}

Generate professional pitch materials. Generate THREE options for title, logline, and tagline.

Return JSON with this exact structure:
{{
  "primaryTitle": "string",
  "altTitles": ["string", "string", "string"],
  "loglines": ["string", "string", "string"],
  "taglines": ["string", "string", "string"],
  "synopsis": "string — 300-400 words pitch synopsis",
  "genre": ["string", "string"],
  "tone": "string — max 4 words",
  "themes": ["string", "string"],
  "setting": "string — 5 words or less",
  "period": "string",
  "format": "string — Feature Film / Short Film / TV Series / Mini-Series / Documentary",
  "estimatedBudget": "string — tier e.g. Low-Mid",
  "estimatedBudgetRange": "string — e.g. $500K-$2M AUD",
  "comparableA": "string — comparable film title",
  "comparableB": "string — comparable film title",
  "targetAudience": "string — 50-80 words, specific demographics"
}}{RANDOMISE_INSTRUCTION}"""


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
            temperature=0.7,
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
