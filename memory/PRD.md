# PITCH'D - Screenplay Development Tool

## Original Problem Statement
Deploy a full-stack web app from GitHub repo: https://github.com/Shadow-Wolves-Productions/pitch-d.git
- Frontend: Vite + React SPA (root directory)
- Backend: FastAPI Python (in /backend directory)
- No database needed, session only

## Architecture
- **Frontend**: Vite + React SPA at `/app/` root, built to `/app/dist/`, served via `serve` at `/app/frontend/` on port 3000
- **Backend**: FastAPI at `/app/backend/server.py` on port 8001
- **AI Integration**: OpenAI GPT-4o via Python SDK with `response_format=json_object`
- **Routing**: `/api/*` → backend:8001, everything else → frontend:3000 (SPA fallback)

## What's Been Implemented

### Jan 24, 2026 - Initial Deployment
- Deployed full-stack app from GitHub repo
- Adapted backend from Anthropic to OpenAI
- Set up frontend build pipeline (Vite → serve)
- Fixed 404 page, resolved deployment blockers

### Jan 24, 2026 - Fix 1 & Fix 2
- Fix 1: PDF auto-download via jsPDF + html2canvas (no print dialog)
- Fix 2: Title card font → Bebas Neue in SelectableCard

### Jan 24, 2026 - Major Update (Iteration 3)
- **Font overhaul**: All Syne fonts → Bebas Neue across entire app (CSS variable, tailwind config, inline styles, Google Fonts link)
- **Backend rewrite**: OpenAI Python SDK with dual-mode prompts:
  - MODE 1 (Script, >=1000 chars): Dr. Scrypto system prompt, detailed analysis
  - MODE 2 (Concept, <1000 chars): Development executive prompt, collaborative tone
  - `response_format={"type": "json_object"}`, temperature=0.3, max_tokens=3000
- **New response fields**: genre, subgenres, tone, time_period, setting
- **Frontend API simplified**: Sends `{text}` → receives parsed JSON directly
- **Script limit**: 300,000 chars (supports full feature screenplays)

## Key Files
- `/app/backend/server.py` - FastAPI backend with OpenAI SDK, dual-mode prompts
- `/app/backend/.env` - OPENAI_API_KEY
- `/app/src/lib/pitchdApi.js` - Frontend API client (simplified)
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - PDF export + one sheet builder
- `/app/src/components/pitchd/onesheet/SelectableCard.jsx` - Title cards with Bebas Neue
- `/app/src/index.css` - CSS variables (--font-syne now maps to Bebas Neue)

## Backlog
- P1: Display new API fields (genre, tone, setting, time_period) in results UI
- P2: DNS configuration for pitchd.shadowwolvesproductions.com.au
- P3: Rate limiting on backend
