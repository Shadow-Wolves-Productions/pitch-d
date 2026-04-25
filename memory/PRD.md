# PITCH'D - Screenplay Development Tool

## Architecture
- Frontend: Vite+React → `/app/dist/` → `serve` on port 3000
- Backend: FastAPI `/app/backend/server.py` on port 8001
- AI: OpenAI GPT-4o, dual-mode (script/concept), Dr. Scrypto prompt

## Implemented
- Full deployment, PDF export via window.print()
- Bebas Neue fonts, visual depth (card shadows, hover lifts, transitions)
- **Project Details**: Collapsible pre-generate section (writer name, phone, email, attachments)
- **Stage 1 — Lock Story Assets**: Title/logline/tagline/synopsis selection with AI Pick badge
- **Stage 2 — Production Details**: Comparables (It's ___ meets ___), themes, format, budget tier/range, setting, period, target audience, attachments
- **New AI prompt**: Dr. Scrypto with genre array, comparableA/B, themes, format, estimatedBudget, targetAudience
- **New PDF template**: White header, teal title block, writer strip, meta rows, comparables, logline, tagline, synopsis, target audience, attached talent
- **Post-export promo**: Dark section (#1a1a1a) with PITCHD25 code, SLATR/SPOT'D cards, fadeIn animation
- 100K truncation with SLATR upgrade banner
- Brand logos (PITCH'D, SLATR, SPOT'D)

## Key Files
- `/app/backend/server.py` - Dr. Scrypto prompt, all new JSON fields
- `/app/src/pages/Pitchd.jsx` - Main page, ProjectDetails, PostExportPromo
- `/app/src/components/pitchd/ProjectDetails.jsx` - Writer details form
- `/app/src/components/pitchd/OneSheetBuilder.jsx` - Stage 1 + Stage 2
- `/app/src/components/pitchd/onesheet/PrintSheet.jsx` - New PDF template
- `/app/src/components/pitchd/PostExportPromo.jsx` - Dark cross-promo section
