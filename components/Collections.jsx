const COLLECTIONS = [
  {
    name: "Wedding Season Edit 💒",
    count: 12,
    color: "linear-gradient(135deg,#8B0000,#C1121F,#FF6B6B)",
    auto: true,
  },
  {
    name: "Office Week — 5 Looks 🏢",
    count: 5,
    color: "linear-gradient(135deg,#2F4F4F,#708090,#B0C4DE)",
    auto: true,
  },
  {
    name: "Navratri 9 Nights 🎉",
    count: 9,
    color: "linear-gradient(135deg,#FF4500,#FF6347,#FFD700)",
    auto: true,
  },
  {
    name: "My Saved Lehengas 💜",
    count: 6,
    color: "linear-gradient(135deg,#4B0082,#8B008B,#FF69B4)",
    auto: false,
  },
  {
    name: "Budget Buys Under ₹999 💚",
    count: 8,
    color: "linear-gradient(135deg,#006400,#228B22,#90EE90)",
    auto: false,
  },
  {
    name: "Celeb Look Dupes ✨",
    count: 4,
    color: "linear-gradient(135deg,#8B6914,#DAA520,#FFD700)",
    auto: false,
  },
];

function CollectionCard({ c }) {
  return (
    <div
      className="product-card"
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid var(--border)",
        height: 200,
      }}
    >
      <div style={{ height: "100%", background: c.color, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.72))",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {c.auto && (
            <span className="badge-raz" style={{ width: "fit-content", marginBottom: 8 }}>
              RAZ Auto ✦
            </span>
          )}
          <div
            className="font-display"
            style={{ fontSize: 19, color: "#fff", fontWeight: 600, marginBottom: 4 }}
          >
            {c.name}
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>
            {c.count} items · Share →
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Collections() {
  const auto = COLLECTIONS.filter((c) => c.auto);
  const mine = COLLECTIONS.filter((c) => !c.auto);

  return (
    <div style={{ minHeight: "calc(100vh - 94px)", marginTop: 94, padding: "40px 0" }}>
      <div className="container">
        {/* Header */}
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
              MY COLLECTIONS
            </div>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(24px,4vw,52px)", color: "var(--cream)", fontWeight: 600 }}
            >
              Your Fashion Boards
            </h2>
          </div>
          <button
            className="btn-gold"
            style={{ padding: "10px 24px", fontSize: 13, borderRadius: 100 }}
          >
            + New Collection
          </button>
        </div>

        {/* RAZ auto-created */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 14 }}
        >
          ✦ RAZ AUTO-CREATED
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {auto.map((c) => (
            <CollectionCard key={c.name} c={c} />
          ))}
        </div>

        {/* User saved */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 14 }}
        >
          MY SAVED
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {mine.map((c) => (
            <CollectionCard key={c.name} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
