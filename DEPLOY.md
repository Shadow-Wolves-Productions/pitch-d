# PITCH'D — Emergent Deployment

## Setup

1. Add environment variable in Emergent:
   - `ANTHROPIC_API_KEY` = your key

2. Deploy both services:
   - Backend: `uvicorn main:app` from `/backend`
   - Frontend: `npm run build` from root, serve `/dist`

3. Route `/api/*` to backend, everything else to frontend SPA

## Local Dev

```bash
# Terminal 1 — backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Terminal 2 — frontend
npm install
npm run dev
```

Frontend proxies `/api/*` to `localhost:8000` via vite config.
