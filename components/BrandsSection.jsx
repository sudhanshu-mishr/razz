import { BRANDS_LUXURY, BRANDS_EVERYDAY } from "../lib/data";

export default function BrandsSection() {
  return (
    <section className="section" style={{ background: "rgba(20,20,20,0.4)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div
            className="font-mono"
            style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 8 }}
          >
            BRAND DIRECTORY
          </div>
          <h2
            className="font-display"
            style={{ fontSize: "clamp(24px,4vw,52px)", color: "var(--cream)", fontWeight: 600 }}
          >
            500+ Indian brands. One search.
          </h2>
        </div>

        {/* Luxury */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", marginBottom: 14 }}
        >
          LUXURY &amp; DESIGNER
        </div>
        <div className="scroll-x" style={{ marginBottom: 32, paddingBottom: 8 }}>
          {BRANDS_LUXURY.map((b) => (
            <div
              key={b}
              className="brand-pill glass"
              style={{ borderRadius: 14, padding: "10px 18px", border: "1px solid var(--border)" }}
            >
              <div style={{ fontSize: 12, color: "var(--gold)", marginBottom: 2 }}>✦</div>
              <div style={{ color: "var(--cream)", fontWeight: 600 }}>{b}</div>
            </div>
          ))}
        </div>

        <div className="gold-divider" style={{ marginBottom: 28 }} />

        {/* Everyday */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", marginBottom: 14 }}
        >
          EVERYDAY &amp; AFFORDABLE
        </div>
        <div className="scroll-x" style={{ paddingBottom: 8 }}>
          {BRANDS_EVERYDAY.map((b) => (
            <div
              key={b}
              className="brand-pill glass"
              style={{ borderRadius: 14, padding: "10px 18px", border: "1px solid var(--border)" }}
            >
              <div style={{ color: "var(--gold)", fontSize: 11, marginBottom: 2 }}>◆</div>
              <div style={{ color: "var(--text)", fontWeight: 500, fontSize: 14 }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
