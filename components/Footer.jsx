const FOOTER_LINKS = [
  [
    "Company",
    ["About RAZ", "How It Works", "For Brands", "Careers", "Blog"],
  ],
  [
    "Legal",
    ["Privacy Policy", "Terms of Use", "Cookie Policy", "Disclaimer"],
  ],
  [
    "Explore",
    ["Trending", "Collections", "Style Quiz", "Brand Directory", "Celeb Looks"],
  ],
];

const SOCIAL_ICONS = ["📸", "📌", "▶️", "🐦"];

export default function Footer({ setPage }) {
  return (
    <footer
      style={{
        background: "#080808",
        borderTop: "1px solid var(--border)",
        padding: "60px 0 32px",
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand col */}
          <div>
            <button
              onClick={() => setPage("home")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "baseline",
                gap: 3,
                marginBottom: 14,
              }}
            >
              <span
                className="font-display"
                style={{ fontSize: 26, fontWeight: 700, color: "var(--cream)" }}
              >
                RAZ
              </span>
              <span
                className="font-mono"
                style={{ fontSize: 13, color: "var(--gold)" }}
              >
                AI
              </span>
            </button>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                lineHeight: 1.7,
                marginBottom: 16,
              }}
            >
              Your Indian Fashion Intelligence. Describe it. Discover it. Wear it.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {SOCIAL_ICONS.map((icon, i) => (
                <div
                  key={i}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: 15,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--gold)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(([title, links]) => (
            <div key={title}>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  marginBottom: 14,
                }}
              >
                {title.toUpperCase()}
              </div>
              {links.map((l) => (
                <div
                  key={l}
                  style={{
                    fontSize: 14,
                    color: "var(--muted)",
                    marginBottom: 10,
                    cursor: "pointer",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}

          {/* Partner CTA */}
          <div
            className="glass"
            style={{ borderRadius: 20, padding: 20, border: "1px solid var(--border)" }}
          >
            <div
              className="font-display"
              style={{ fontSize: 19, color: "var(--cream)", marginBottom: 8 }}
            >
              Partner with RAZ
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                marginBottom: 16,
                lineHeight: 1.6,
              }}
            >
              List your brand on India&apos;s fastest-growing AI fashion platform.
            </p>
            <button
              className="btn-gold"
              style={{
                padding: "10px 0",
                fontSize: 13,
                width: "100%",
                borderRadius: 10,
              }}
            >
              Join as Brand →
            </button>
          </div>
        </div>

        <div className="gold-divider" style={{ marginBottom: 20 }} />

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Made with ❤️ in India 🇮🇳 for India&apos;s Fashion Lovers
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--muted)",
              maxWidth: 480,
              textAlign: "right",
              lineHeight: 1.6,
            }}
          >
            RAZ AI searches and curates. All purchases are completed on brand/retailer websites.
            RAZ earns affiliate commission.
          </div>
        </div>

        <div
          className="font-mono"
          style={{
            marginTop: 16,
            fontSize: 10,
            color: "rgba(255,153,51,0.35)",
            textAlign: "center",
            letterSpacing: "0.06em",
          }}
        >
          © 2025 RAZ AI · INDIA&apos;S FASHION INTELLIGENCE · ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
