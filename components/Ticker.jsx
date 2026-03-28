import { TICKER_ITEMS } from "../lib/data";

export default function Ticker() {
  const full = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div
      style={{
        background: "rgba(255,153,51,0.08)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        height: 34,
      }}
    >
      <div
        className="anim-ticker"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 48,
          height: "100%",
          width: "max-content",
        }}
      >
        {full.map((t, i) => (
          <span
            key={i}
            style={{
              fontSize: 12,
              color: "var(--text)",
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
