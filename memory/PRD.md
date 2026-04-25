# PITCH'D - Screenplay Development Tool

## Architecture
- Frontend: Vite+React → `/app/dist/` → `serve` on port 3000
- Backend: FastAPI `/app/backend/server.py` on port 8001  
- AI: OpenAI GPT-4o, temperature 0.7, Dr. Scrypto prompt (word-for-word as specified)

## System Prompt
The exact Dr. Scrypto prompt from the user's spec is being sent — verified in server.py lines 23-89. Includes STEP 1 EXTRACT and STEP 2 GENERATE with all field requirements. Randomisation instruction appended to every user prompt.

## All Implemented Features
- Logo: 2x size, left-aligned with content, subtitle underneath
- Header: "paste it. pitch it." on right side
- Loading text: Centered in button
- Footer: Two-line layout (copyright on line 1, session/saved/account on line 2)
- Project Details: Collapsible pre-generate (writer name/phone/email/attachments)
- Stage 1: Lock Story Assets (title/logline/tagline/synopsis)
- Stage 2: Production Details with structured attachments (Dir/Composer/DOP/Producer/Cast+Add Cast), budget range dropdown dependent on tier (Sweat Equity to $200M+)
- PDF Export: jsPDF CDN + html2canvas (auto-download)
- Post-Export Promo: SLATR blue theme (#3a69b1), SPOT'D yellow theme (#e8fc6c), both with feature lists, 72px logos
- Coupon code: PITCHD10 / 10% off (updated from PITCHD25/15%)
- SPOT'D card: Matching structure to SLATR (4 feature points in columns)
- Removed "Part of the Shadow Wolves Creative Suite" line under cards
