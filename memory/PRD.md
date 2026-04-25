# PITCH'D - Screenplay Development Tool

## Architecture
- Frontend: Vite+React → `/app/dist/` → `serve` on port 3000
- Backend: FastAPI `/app/backend/server.py` on port 8001
- AI: OpenAI GPT-4o, dual-mode (script/concept)

## Implemented
- Full deployment from GitHub, Anthropic→OpenAI
- PDF auto-download (jsPDF blob method)
- All Syne fonts → Bebas Neue
- OpenAI SDK, dual-mode prompts, json_object response
- Genre/tone/setting metadata in results + PDF
- Logo: official PITCH'D brand image
- 100K truncation with SLATR upgrade banner
- **Complete copy rewrite**: Direct filmmaker-to-filmmaker tone across all UI
- Ecosystem promo section (SLATR + SPOT'D cards)
- Promo modal with PITCHD25 code after PDF export
- Error states: specific messages for empty input, network, generic errors

## Key Files
- `/app/backend/server.py` - FastAPI + OpenAI SDK
- `/app/src/pages/Pitchd.jsx` - Main page, error handling, truncation banner
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - Results + export
- `/app/src/components/pitchd/CrossPromo.jsx` - EcosystemPromo (SLATR/SPOT'D)
- `/app/src/components/pitchd/onesheet/PromoModal.jsx` - Post-export modal

## Backlog
- P2: DNS for pitchd.shadowwolvesproductions.com.au
- P3: SLATR/SPOT'D logo images when uploaded
