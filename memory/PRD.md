# PITCH'D - Screenplay Development Tool

## Original Problem Statement
Deploy a full-stack web app from GitHub repo: https://github.com/Shadow-Wolves-Productions/pitch-d.git
- Frontend: Vite + React SPA (root directory)
- Backend: FastAPI Python (in /backend directory)
- No database needed, session only
- Domain: pitchd.shadowwolvesproductions.com.au (for DNS swap later)

## Architecture
- **Frontend**: Vite + React SPA at `/app/` root, built to `/app/dist/`, served via `serve` at `/app/frontend/` on port 3000
- **Backend**: FastAPI at `/app/backend/server.py` on port 8001
- **AI Integration**: OpenAI GPT-4o (originally Anthropic Claude, adapted to OpenAI per user request)
- **Routing**: `/api/*` → backend:8001, everything else → frontend:3000 (SPA fallback)

## What's Been Implemented

### Jan 24, 2026 - Initial Deployment
- Deployed full-stack app from GitHub repo
- Created `/app/backend/server.py` - translates Anthropic-format API calls to OpenAI (GPT-4o)
- Set up frontend build pipeline (Vite build → serve via `serve` package)
- Fixed 404 page (removed base44 SDK dependency)
- Resolved deployment blockers (removed conflicting main.py, aligned emergent.yaml)

### Jan 24, 2026 - Fix 1 & Fix 2
- **Fix 1**: Replaced `window.print()` with jsPDF + html2canvas PDF auto-download. Scripts loaded dynamically from CDN. PDF named `PITCHD_[TITLE]_OneSheet.pdf`. Promo modal appears after download.
- **Fix 2**: Changed title card font from Syne to Bebas Neue in SelectableCard component (large mode). Font size increased to 36px with 0.03em letter-spacing.

## Key Files
- `/app/backend/server.py` - FastAPI backend with `/api/analyse` and `/api/health`
- `/app/backend/.env` - OPENAI_API_KEY
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - PDF export logic
- `/app/src/components/pitchd/onesheet/SelectableCard.jsx` - Title cards with Bebas Neue
- `/app/src/components/pitchd/onesheet/PrintSheet.jsx` - Print sheet captured for PDF

## Backlog
- P1: DNS configuration for pitchd.shadowwolvesproductions.com.au
- P2: UI/UX improvements if requested
- P3: Rate limiting on backend
