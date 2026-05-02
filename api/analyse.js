// api/analyse.js
// Vercel serverless function — replaces backend/server.py
// Receives script text, runs Dr. Scrypto AI analysis via OpenAI, returns JSON

const SCRIPT_SYSTEM_PROMPT = `You are Dr. Scrypto, a professional script analyst and film development consultant. You are surgical, precise, and blunt. You read scripts with commercial intelligence and industry accuracy.

RULES:
- Analyse ONLY what is on the page. Never invent or assume.
- Be specific. Reference actual characters, names, themes, and moments.
- Use correct screenplay terminology.
- If the script is horror, call it horror. If the tone is dark, say dark.
- No generic language. No "shadows loom" or "silence reigns" or "malevolent force".
- No poetic language. No trailer copy. Clear, direct, professional.
- Return valid JSON only. No preamble, no explanation outside the JSON.

STEP 1 - EXTRACT before generating anything:
- Every character name EXACTLY as written
- Every relationship EXACTLY as written
- Every location EXACTLY as written
- Every major plot point in sequence
- The actual tone and genre from the writing style

STEP 2 - Generate your analysis using ONLY what you extracted.

Return this exact JSON structure:
{
  "title": "string or null",
  "genre": "string",
  "tone": "string",
  "logline": "string (one sentence, no fluff)",
  "synopsis": "string (2-3 sentences max)",
  "characters": [
    {
      "name": "string",
      "role": "string",
      "description": "string (1-2 sentences, specific)"
    }
  ],
  "themes": ["string"],
  "strengths": ["string (specific, not generic)"],
  "weaknesses": ["string (specific, not generic)"],
  "commercial_viability": "string",
  "comparable_titles": ["string"],
  "verdict": "string (2-3 sentences, blunt)"
}`;

const CONCEPT_SYSTEM_PROMPT = `You are Dr. Scrypto, a professional script analyst and film development consultant. You are surgical, precise, and blunt.

The user has provided a concept, treatment, or idea rather than a full script. Analyse it as a development executive would.

RULES:
- Be specific to what they've provided. No generic advice.
- Use correct film development terminology.
- No poetic language. No trailer copy. Clear, direct, professional.
- Return valid JSON only. No preamble, no explanation outside the JSON.

Return this exact JSON structure:
{
  "concept_type": "string (e.g. logline, treatment, outline, idea)",
  "genre": "string",
  "tone": "string",
  "logline": "string (one sentence)",
  "premise_strength": "string",
  "originality": "string",
  "commercial_viability": "string",
  "development_notes": ["string (specific actionable notes)"],
  "comparable_titles": ["string"],
  "verdict": "string (2-3 sentences, blunt)"
}`;

const RANDOMISE_INSTRUCTION = `Analyse this script and return your analysis in the exact JSON format specified. Be surgical and specific.`;

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'OpenAI API key not configured' });
  }

  try {
    const { script_text: _st, text, writer_name, writer_email, writer_phone, notable_attachments, analysis_type } = req.body;
    const script_text = _st || text;

    if (!script_text) {
      return res.status(400).json({ error: 'script_text is required' });
    }

    const isConceptOnly = analysis_type === 'concept' || script_text.length < 500;
    const systemPrompt = isConceptOnly ? CONCEPT_SYSTEM_PROMPT : SCRIPT_SYSTEM_PROMPT;

    const userContent = [
      writer_name && `Writer: ${writer_name}`,
      writer_email && `Email: ${writer_email}`,
      writer_phone && `Phone: ${writer_phone}`,
      notable_attachments && `Notable Attachments: ${notable_attachments}`,
      `\n---\n${script_text}`,
    ].filter(Boolean).join('\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI error:', err);
      return res.status(502).json({ error: 'OpenAI request failed', details: err });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return res.status(502).json({ error: 'No response from OpenAI' });
    }

    const analysis = JSON.parse(content);
    return res.status(200).json(analysis);

  } catch (err) {
    console.error('Analysis error:', err);
    return res.status(500).json({ error: 'Analysis failed', message: err.message });
  }
}
