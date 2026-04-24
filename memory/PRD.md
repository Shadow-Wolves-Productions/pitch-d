# PITCH'D - Screenplay Development Tool

## Architecture
- Frontend: Vite+React → `/app/dist/` → served via `serve` on port 3000
- Backend: FastAPI `/app/backend/server.py` on port 8001
- AI: OpenAI GPT-4o, dual-mode (script >=1000 chars / concept <1000)

## Implemented
- Initial deployment from GitHub, Anthropic→OpenAI adaptation
- PDF auto-download via jsPDF + html2canvas (manual blob download)
- All Syne fonts → Bebas Neue
- Backend: OpenAI SDK, dual-mode prompts, json_object response
- Genre/tone/setting/time_period/subgenres in results UI + PDF
- Promo modal links: SLATR → www.slatr.com.au, Spot'd → www.getspotd.app
- Logo replaced with official PITCH'D brand image
- **100K char truncation**: Scripts >100,000 chars silently truncated, analysed, then premium SLATR upgrade banner shown below results
- Upgrade banner: teal bg, feature list (14 items in 2 cols), SLATR CTA buttons, PITCHD25 code

## Key Files
- `/app/backend/server.py` - FastAPI + OpenAI SDK (100K truncation)
- `/app/src/pages/Pitchd.jsx` - wasTruncated state
- `/app/src/components/pitchd/UpgradeBanner.jsx` - Premium upgrade banner
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - PDF export + metadata + banner
- `/app/src/components/pitchd/Logo.jsx` - Brand image logo

## Backlog
- P2: DNS for pitchd.shadowwolvesproductions.com.au
