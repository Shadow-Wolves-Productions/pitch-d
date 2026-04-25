# PITCH'D - Screenplay Development Tool

## Architecture
- Frontend: Vite+React → `/app/dist/` → `serve` on port 3000
- Backend: FastAPI `/app/backend/server.py` on port 8001
- AI: OpenAI GPT-4o, temperature 0.7, Dr. Scrypto prompt

## All Implemented Features
- Logo: Official PITCH'D brand image at 2x size, "paste it. pitch it." on right
- Project Details: Collapsible pre-generate section (writer name/phone/email/attachments)
- Stage 1: Lock Story Assets (title/logline/tagline/synopsis selection)
- Stage 2: Production Details (comparables, themes, format, budget tier+range dropdowns, setting, period, target audience, structured attachments with Dir/Composer/DOP/Producer/Cast+Add Cast)
- Budget Range: Dropdown dependent on Budget Tier (Micro: Sweat Equity to $50K, Studio: $120M+)
- PDF Export: jsPDF CDN + html2canvas (auto-download, no print dialog)
- Post-Export Promo: Dark section with SLATR (blue #3a69b1 theme, 72px logo) + SPOT'D (yellow #e8fc6c, 66px logo)
- 100K truncation with SLATR upgrade banner
- Temperature 0.7 + randomisation instruction for varied titles
- Dr. Scrypto system prompt (word-for-word as specified)
- Visual depth: Card shadows, hover lifts, transitions
