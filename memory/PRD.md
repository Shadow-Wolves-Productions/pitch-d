# PITCH'D - Screenplay Development Tool

## Original Problem Statement
Deploy full-stack app from GitHub repo: pitch-d.git (Vite+React frontend, FastAPI backend, OpenAI GPT-4o)

## Architecture
- Frontend: Vite+React → `/app/dist/` → served via `serve` on port 3000
- Backend: FastAPI `/app/backend/server.py` on port 8001
- AI: OpenAI GPT-4o, dual-mode (script >=1000 chars / concept <1000 chars)

## Implemented
- Initial deployment, Anthropic→OpenAI adaptation
- PDF auto-download via jsPDF + html2canvas (manual blob download, not pdf.save())
- All Syne fonts → Bebas Neue
- Backend: OpenAI SDK, dual-mode prompts, json_object response
- Genre/tone/setting/time_period/subgenres displayed in results UI + PDF
- Promo modal links: SLATR → www.slatr.com.au, Spot'd → www.getspotd.app
- Promo modal only shows after successful PDF download

## Key Files
- `/app/backend/server.py` - FastAPI + OpenAI SDK
- `/app/backend/.env` - OPENAI_API_KEY
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - PDF export + metadata display
- `/app/src/components/pitchd/onesheet/PrintSheet.jsx` - PDF layout with metadata
- `/app/src/components/pitchd/onesheet/PromoModal.jsx` - Updated links

## Backlog
- P2: DNS for pitchd.shadowwolvesproductions.com.au
