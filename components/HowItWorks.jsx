const STEPS = [
  {
    n: "01",
    title: "Tell RAZ",
    desc: "Type in natural language or Hinglish. 'Lehenga for sangeet under ₹8K' or 'kuch hatke for Diwali' — RAZ understands everything.",
    icon: "💬",
  },
  {
    n: "02",
    title: "RAZ Searches Live",
    desc: "RAZ uses AI-powered web search across Myntra, AJIO, Nykaa Fashion, Amazon.in and 500+ Indian fashion sites in real time.",
    icon: "🌐",
  },
  {
    n: "03",
    title: "You Shop Directly",
    desc: "Get real products with real prices and real links. One tap opens the exact product page on the retailer's website. No middlemen.",
    icon: "🛍",
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div
            className="font-mono"
            style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 12 }}
          >
            HOW IT WORKS
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(28px,5vw,60px)", color: "var(--cream)", fontWeight: 600 }}
          >
            Fashion discovery, reimagined
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="glass gold-glow"
              style={{ borderRadius: 20, padding: 32, border: "1px solid var(--border)", textAlign: "center" }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{s.icon}</div>
              <div
                className="font-mono"
                style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 8 }}
              >
                STEP {s.n}
              </div>
              <h3
                className="font-display"
                style={{ fontSize: 26, color: "var(--cream)", fontWeight: 600, marginBottom: 12 }}
              >
                {s.title}
              </h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: 14 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
