import { OCCASIONS } from "../lib/data";

export default function OccasionExplorer({ setPage, setInitialQuery }) {
  return (
    <section className="section" style={{ background: "rgba(20,20,20,0.4)" }}>
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 40,
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.1em", marginBottom: 8 }}
            >
              OCCASION EXPLORER
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(24px,4vw,52px)",
                color: "var(--cream)",
                fontWeight: 600,
              }}
            >
              What&apos;s the occasion?
            </h2>
          </div>
          <button
            className="btn-ghost hide-mobile"
            style={{ padding: "8px 20px", fontSize: 13, borderRadius: 100 }}
            onClick={() => setPage("chat")}
          >
            View All →
          </button>
        </div>

        <div className="scroll-x" style={{ paddingBottom: 16 }}>
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              className="occasion-card"
              style={{
                width: 180,
                height: 240,
                flexShrink: 0,
                borderRadius: 20,
                overflow: "hidden",
                background: occ.color,
                position: "relative",
              }}
              onClick={() => {
                setInitialQuery(occ.query);
                setPage("chat");
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 40%, transparent)",
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{occ.emoji}</div>
                <div
                  className="font-display"
                  style={{ fontSize: 16, color: "#fff", fontWeight: 600, lineHeight: 1.2, marginBottom: 6 }}
                >
                  {occ.name}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Explore Looks →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
