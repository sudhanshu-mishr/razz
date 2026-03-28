import { useState } from "react";
import { getPlatformInfo, getProductGradient } from "../lib/data";

export default function ProductCard({ product, compact = false }) {
  const [saved, setSaved] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const pf = getPlatformInfo(product.url);
  const disc =
    product.discount_pct ||
    (product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0);
  const bg = getProductGradient(product.name, product.fabric || "");
  const hasUrl = product.url && product.url.startsWith("http");

  const handleShop = (e) => {
    e.stopPropagation();
    if (hasUrl) {
      window.open(product.url, "_blank", "noopener,noreferrer");
    } else {
      const q = encodeURIComponent(`${product.name} ${product.brand}`);
      window.open(`https://www.myntra.com/${q}`, "_blank", "noopener,noreferrer");
    }
  };

  const btnColor =
    pf.color === "#FF9933"
      ? "linear-gradient(135deg,#FF9933,#e8851f)"
      : `linear-gradient(135deg,${pf.color},${pf.color}cc)`;

  return (
    <div
      className="product-card glass gold-glow"
      style={{
        width: compact ? 200 : "100%",
        flexShrink: compact ? 0 : undefined,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,153,51,0.18)",
      }}
    >
      {/* Image */}
      <div
        className="product-img-wrap"
        style={{ height: compact ? 140 : 180, background: bg, position: "relative" }}
      >
        {product.image_url && !imgErr && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image_url}
            alt={product.name}
            style={{ position: "absolute", inset: 0 }}
            onError={() => setImgErr(true)}
          />
        )}

        {/* Top-left badges */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {hasUrl && <span className="badge-live">● LIVE</span>}
          {disc > 0 && (
            <span
              className="tag"
              style={{ background: "rgba(193,18,31,0.85)", color: "#fff" }}
            >
              {disc}% OFF
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSaved(!saved);
          }}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(255,255,255,0.15)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: saved ? "var(--gold)" : "#fff",
          }}
        >
          {saved ? "♥" : "♡"}
        </button>

        {/* Platform badge */}
        {hasUrl && (
          <div style={{ position: "absolute", bottom: 8, left: 8 }}>
            <span
              className="font-mono"
              style={{
                fontSize: 9,
                color: pf.color,
                background: "rgba(0,0,0,0.7)",
                padding: "2px 6px",
                borderRadius: 2,
                letterSpacing: "0.06em",
              }}
            >
              {product.platform || pf.short}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: compact ? "10px 12px" : "14px 16px" }}>
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--gold)", marginBottom: 4 }}
        >
          {product.brand}
        </div>

        <div
          className="font-display"
          style={{
            fontSize: compact ? 13 : 15,
            color: "var(--text)",
            lineHeight: 1.3,
            marginBottom: 6,
          }}
        >
          {product.name}
        </div>

        {!compact && product.occasion?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
            {product.occasion.slice(0, 2).map((o) => (
              <span
                key={o}
                className="tag"
                style={{
                  background: "rgba(255,153,51,0.1)",
                  color: "var(--gold)",
                  border: "1px solid rgba(255,153,51,0.2)",
                }}
              >
                {o}
              </span>
            ))}
            {product.fabric && (
              <span
                className="tag"
                style={{ background: "rgba(255,255,255,0.05)", color: "var(--muted)" }}
              >
                {product.fabric}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: compact ? 8 : 12,
          }}
        >
          <span
            className="font-display"
            style={{ fontSize: compact ? 16 : 20, color: "var(--gold)", fontWeight: 700 }}
          >
            ₹{(product.price || 0).toLocaleString("en-IN")}
          </span>
          {product.originalPrice > product.price && (
            <span
              style={{ fontSize: 12, color: "var(--muted)", textDecoration: "line-through" }}
            >
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {!compact && product.price > 999 && (
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
            EMI from ₹{Math.round(product.price / 6).toLocaleString("en-IN")}/mo · No Cost
          </div>
        )}

        <button
          className="btn-gold"
          style={{
            width: "100%",
            padding: compact ? "7px 0" : "10px 0",
            fontSize: compact ? 11 : 13,
            borderRadius: 10,
            background: btnColor,
          }}
          onClick={handleShop}
        >
          {compact ? "Shop →" : `${pf.name} ↗`}
        </button>
      </div>
    </div>
  );
}
