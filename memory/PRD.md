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

## User Personas
- Screenwriters/filmmakers who want to analyze and pitch their screenplays
- Users paste/upload script text, get AI-generated titles, loglines, taglines, and synopsis

## Core Requirements
- [x] Script text input (paste or file upload)
- [x] AI-powered script analysis via OpenAI
- [x] Results display (titles, loglines, taglines, synopsis)
- [x] Export capabilities (text, PDF, print)
- [x] One-sheet builder
- [x] 404 page
- [x] SPA routing

## What's Been Implemented (Jan 24, 2026)
- Deployed full-stack app from GitHub repo
- Created `/app/backend/server.py` - translates Anthropic-format API calls to OpenAI (GPT-4o)
- Set up frontend build pipeline (Vite build → serve via `serve` package)
- Fixed 404 page (removed base44 SDK dependency)
- All tests passing: Backend 100%, Frontend 100%

## Key Files
- `/app/backend/server.py` - FastAPI backend with `/api/analyse` and `/api/health`
- `/app/backend/.env` - OPENAI_API_KEY
- `/app/src/lib/pitchdApi.js` - Frontend API client
- `/app/src/pages/Pitchd.jsx` - Main page
- `/app/src/components/pitchd/` - All UI components

## Backlog
- P1: DNS configuration for pitchd.shadowwolvesproductions.com.au
- P2: UI/UX improvements if requested
- P2: Error handling improvements for API failures
- P3: Rate limiting on backend
