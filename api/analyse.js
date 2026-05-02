// api/analyse.js — Vercel serverless function replacing backend/server.py

const SCRIPT_SYSTEM_PROMPT = `You are Dr. Scrypto, a professional script analyst and film development consultant. You are surgical, precise, and blunt. You read scripts with commercial intelligence and industry accuracy.

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
}`;

const CONCEPT_SYSTEM_PROMPT = `You are a development executive helping a filmmaker shape their idea into a pitchable concept.
You are collaborative, constructive, and specific.
You generate professional industry-standard pitch materials from a rough idea or concept — not a finished screenplay.
Extrapolate intelligently — fill gaps creatively but stay true to the filmmaker's stated idea.
Return valid JSON only. No preamble, no explanation outside the JSON.`;

const RANDOMISE_INSTRUCTION = `\n\nGenerate fresh, creative options. Do not repeat titles or phrases from previous responses. Vary your approach each time.`;

function buildScriptUserPrompt(scriptText) {
  return `Based on this screenplay, generate pitch materials. Generate THREE options for title, logline, and tagline so the filmmaker can choose.

SCRIPT TEXT:
${scriptText}

Return the JSON structure as specified in your instructions.${RANDOMISE_INSTRUCTION}`;
}

function buildConceptUserPrompt(userIdea) {
  return `A filmmaker has the following idea for a film:

CONCEPT:
${userIdea}

Generate professional pitch materials. Generate THREE options for title, logline, and tagline.

Return JSON with this exact structure:
{
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
}${RANDOMISE_INSTRUCTION}`;
}

export const config = { maxDuration: 60 };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OpenAI API key not configured' });

  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: { message: 'No text provided' } });
    }

    const isScript = text.length >= 1000;
    const systemPrompt = isScript ? SCRIPT_SYSTEM_PROMPT : CONCEPT_SYSTEM_PROMPT;
    const userPrompt = isScript
      ? buildScriptUserPrompt(text.slice(0, 100000))
      : buildConceptUserPrompt(text);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        max_tokens: 3000,
        temperature: 0.7,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI error:', err);
      return res.status(502).json({ error: { message: 'OpenAI request failed' } });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return res.status(502).json({ error: { message: 'No response from OpenAI' } });

    const result = JSON.parse(content);
    return res.status(200).json(result);

  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: { message: err.message } });
  }
}
