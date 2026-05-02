// api/analyse.js
// Vercel serverless function — replaces backend/server.py
// Receives script text, runs Dr. Scrypto AI analysis via OpenAI, returns JSON

const SYSTEM_PROMPT = `You are a professional film development consultant with 20 years of major studio experience. You read scripts with precision and commercial intelligence. Your job is to strip a story to its most potent, marketable core.

CRITICAL - before generating anything, read the entire script and extract: every character name exactly as written, every relationship exactly as written, the specific genre and tone, the specific inciting incident, the actual stakes. NEVER invent or assume anything not on the page.

TITLES: Must feel like they belong on a festival slate or distributor one sheet. Specific to this story. Avoid: The Watcher, Echoes in the Night, The Shadow, What Lies Within, The Darkness - these are placeholders not titles.

LOGLINES (3): Follow this exactly - When [specific inciting incident using real character names from the script], [protagonist name and specific flaw or circumstance] must [clear concrete objective] before [specific stakes or deadline]. Omit "In a world". Use real names. Be specific.

TAGLINES (3): Under 10 words. Punchy, specific, poster-worthy. Banned: "or perish", "face your fears", "not all monsters", "silence is deadly", "will they survive", "in the dark". Think: what would a Sundance programmer put on the festival poster.

SYNOPSIS: 3-4 sentences. Active voice. Present tense. Name actual characters. Reads like a pitch document a development exec would forward to their boss. No flowery language. No passive constructions.

Return only valid JSON, no markdown:
{"primaryTitle":"string","altTitles":["string","string","string"],"loglines":["string","string","string"],"taglines":["string","string","string"],"synopsis":"string"};`

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
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        temperature: 0.7,
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
