# RAZ AI 🌟
### India's AI-powered Fashion Intelligence Platform

> *"Describe it. Discover it. Wear it."*

RAZ AI is a chat-first fashion discovery platform that searches Myntra, AJIO, Nykaa Fashion, Amazon.in and 500+ Indian brands in real time using Anthropic's Claude AI with live web search. Every product result comes with a real link directly to the product page.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 14 (Pages Router) + React 18 |
| Styling   | Pure CSS (no Tailwind — custom design system) |
| AI        | Anthropic Claude (`claude-sonnet-4-20250514`) + `web_search` tool |
| Backend   | Next.js API routes (Node.js) |
| Fonts     | Cormorant Garamond · DM Sans · Space Mono |
| Deploy    | Render (single Web Service) |

---

## Local Development

### 1. Clone / download the project

```bash
git clone https://github.com/your-username/raz-ai.git
cd raz-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxx
```

Get your key at: https://console.anthropic.com

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Render

### Option A — render.yaml (Recommended)

The repo includes a `render.yaml` file. Just:

1. Push your code to GitHub / GitLab
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your repo — Render will auto-detect `render.yaml`
4. Set the `ANTHROPIC_API_KEY` environment variable in the Render dashboard
5. Click **Deploy**

### Option B — Manual Web Service

1. Go to [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub repo
3. Fill in:
   | Field | Value |
   |-------|-------|
   | **Environment** | Node |
   | **Region** | Singapore (closest to India) |
   | **Build Command** | `npm install && npm run build` |
   | **Start Command** | `npm start` |
4. Add environment variable:
   - Key: `ANTHROPIC_API_KEY`
   - Value: your key from console.anthropic.com
5. Click **Create Web Service**

> **Free tier note:** Render's free tier spins down after 15 minutes of inactivity. The first request after spin-down takes ~30 seconds. Upgrade to Starter ($7/mo) for always-on.

---

## Project Structure

```
raz-ai/
├── components/
│   ├── Nav.jsx               # Sticky navigation + ticker
│   ├── Ticker.jsx            # Live trend ticker bar
│   ├── Hero.jsx              # Landing hero with rotating queries
│   ├── HowItWorks.jsx        # 3-step explainer
│   ├── OccasionExplorer.jsx  # Scrollable occasion cards
│   ├── TrendingSection.jsx   # Masonry trending grid
│   ├── BrandsSection.jsx     # Brand carousels
│   ├── ChatPage.jsx          # Full chat interface
│   ├── ProductCard.jsx       # Product card with real links
│   ├── StyleQuiz.jsx         # 6-step style quiz + DNA result
│   ├── Collections.jsx       # User collections page
│   └── Footer.jsx            # Footer with links + partner CTA
│
├── pages/
│   ├── _app.js               # Global CSS import
│   ├── _document.js          # Custom head (fonts, meta)
│   ├── index.js              # Main page + client-side routing
│   └── api/
│       └── search.js         # Anthropic API proxy (server-side)
│
├── styles/
│   └── globals.css           # Full design system
│
├── lib/
│   └── data.js               # Constants, mock data, helpers
│
├── render.yaml               # Render deployment config
├── next.config.js
├── package.json
└── .env.example
```

---

## How the AI Search Works

1. User types a query in the chat (e.g. *"lehenga for sangeet under ₹8,000"*)
2. Frontend sends `POST /api/search` with the query
3. Server calls Anthropic Claude API with the `web_search_20250305` tool
4. Claude searches Myntra, AJIO, Nykaa, Amazon.in and more in real time
5. Claude returns structured JSON with real product names, prices, and URLs
6. Frontend renders product cards — every "Shop Now" button opens the real product page

The API key **never touches the frontend** — all Anthropic calls happen server-side in `/pages/api/search.js`.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | ✅ Yes | Your Anthropic API key |
| `PORT` | Auto-set by Render | Port for `next start` |
| `NODE_ENV` | Auto-set | `production` on Render |

---

## Customisation

### Change brand name / colors
Edit `/styles/globals.css` CSS variables:
```css
:root {
  --gold:  #FF9933;   /* Saffron gold */
  --red:   #C1121F;   /* Vermillion red */
  --cream: #F5E6D3;   /* Champagne cream */
}
```

### Change AI search behaviour
Edit the `SYSTEM_PROMPT` in `/pages/api/search.js` to tune which sites Claude searches and how it formats responses.

### Add new occasions
Edit the `OCCASIONS` array in `/lib/data.js`.

---

## License

MIT — build whatever you want on top of this.

---

*Made with ❤️ in India 🇮🇳*
