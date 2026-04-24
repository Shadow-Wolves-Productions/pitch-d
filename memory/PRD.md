# PITCH'D - Screenplay Development Tool

## Original Problem Statement
Deploy a full-stack web app from GitHub repo: https://github.com/Shadow-Wolves-Productions/pitch-d.git

## Architecture
- **Frontend**: Vite + React SPA → built to `/app/dist/` → served via `serve` on port 3000
- **Backend**: FastAPI at `/app/backend/server.py` on port 8001
- **AI**: OpenAI GPT-4o via Python SDK, dual-mode (script/concept)
- **Routing**: `/api/*` → backend:8001, else → frontend:3000

## Implemented (Jan 24, 2026)
- Initial deployment from GitHub, Anthropic→OpenAI adaptation
- PDF auto-download via jsPDF + html2canvas (npm imports, not CDN)
- All Syne fonts → Bebas Neue
- Backend rewrite: OpenAI SDK, dual-mode prompts (Dr. Scrypto / Dev Exec), json_object response
- New API fields: genre, subgenres, tone, time_period, setting
- Promo modal links: SLATR → www.slatr.com.au, Spot'd → www.getspotd.app
- 404 page fixed (removed base44 SDK dependency)

## Key Files
- `/app/backend/server.py` - FastAPI + OpenAI SDK
- `/app/backend/.env` - OPENAI_API_KEY
- `/app/src/lib/pitchdApi.js` - Frontend API
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - PDF export + builder
- `/app/src/components/pitchd/onesheet/PromoModal.jsx` - Promo modal with updated links

## Backlog
- P1: Display new API fields (genre, tone, setting) in results UI
- P2: DNS for pitchd.shadowwolvesproductions.com.au
