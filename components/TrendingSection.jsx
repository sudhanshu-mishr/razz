import { TRENDING_CARDS } from "../lib/data";

const TABS = ["What's Hot 🔥", "Mumbai Vibes", "Delhi Weddings", "Sustainable Picks", "Under ₹999"];

export default function TrendingSection() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ marginBottom: 40 }}>
          <div
            className="font-mono"
            style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 8 }}
          >
            TRENDING NOW
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(24px,4vw,52px)", color: "var(--cream)", fontWeight: 600 }}
          >
            What India is wearing
          </h2>
        </div>

        {/* Filter tabs */}
        <div className="scroll-x" style={{ marginBottom: 32 }}>
          {TABS.map((t) => (
            <button
              key={t}
              className="chip"
              style={{ flexShrink: 0, padding: "6px 16px", borderRadius: 100 }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="masonry">
          {TRENDING_CARDS.map((t) => (
            <div
              key={t.id}
              className="masonry-item product-card glass"
              style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)" }}
            >
              <div style={{ height: t.h, background: t.color, position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))",
                  }}
                />
                <div style={{ position: "absolute", top: 12, left: 12 }}>
                  <span
                    className="tag"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      color: "var(--gold)",
                      border: "1px solid rgba(255,153,51,0.3)",
                    }}
                  >
                    {t.tag}
                  </span>
                </div>
                <div style={{ position: "absolute", bottom: 12, right: 12 }}>
                  <span className="trend-score">↑ {t.score}%</span>
                </div>
              </div>

              <div style={{ padding: "14px 16px" }}>
                <div
                  className="font-display"
                  style={{ fontSize: 15, color: "var(--text)", marginBottom: 8, lineHeight: 1.3 }}
                >
                  {t.title}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span className="font-mono" style={{ fontSize: 10, color: "var(--muted)" }}>
                    RAZ Trending Score
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div
                      style={{
                        width: 48,
                        height: 4,
                        background: "var(--surface2)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${t.score}%`,
                          height: "100%",
                          background: "linear-gradient(90deg,var(--gold),var(--red))",
                          borderRadius: 2,
                        }}
                      />
                    </div>
                    <span className="trend-score">{t.score}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
