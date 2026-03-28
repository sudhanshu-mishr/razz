import Ticker from "./Ticker";

const NAV_LINKS = [
  ["Explore", "chat"],
  ["Collections", "collections"],
  ["Trending", "trending"],
  ["Style Quiz", "quiz"],
  ["Brands", "brands"],
];

export default function Nav({ page, setPage }) {
  return (
    <nav className="sticky-nav">
      <Ticker />
      <div
        className="container"
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => setPage("home")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "baseline",
            gap: 3,
          }}
        >
          <span
            className="font-display anim-glow"
            style={{ fontSize: 26, fontWeight: 700, color: "var(--cream)", letterSpacing: -1 }}
          >
            RAZ
          </span>
          <span
            className="font-mono"
            style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", marginLeft: 2 }}
          >
            AI
          </span>
        </button>

        {/* Desktop Links */}
        <div
          className="hide-mobile"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {NAV_LINKS.map(([label, pg]) => (
            <button
              key={pg}
              className={`nav-link ${page === pg ? "active" : ""}`}
              onClick={() => setPage(pg)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#FF9933,#C1121F)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 14,
                color: "#0A0A0A",
              }}
            >
              A
            </div>
            <div className="badge-notif">3</div>
          </div>
          <button
            className="btn-gold rounded-full hide-mobile"
            style={{ padding: "8px 20px", fontSize: 13, borderRadius: 100 }}
            onClick={() => setPage("chat")}
          >
            Chat with RAZ →
          </button>
        </div>
      </div>
    </nav>
  );
}
