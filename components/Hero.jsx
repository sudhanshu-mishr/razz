import { useState, useEffect } from "react";
import { ROTATING_QUERIES } from "../lib/data";

export default function Hero({ setPage }) {
  const [qi, setQi] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setQi((i) => (i + 1) % ROTATING_QUERIES.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const stats = [
    ["LIVE", "Web Search Active"],
    ["500+", "Indian Brands"],
    ["Real ₹", "Always"],
    ["10", "Occasions Mapped"],
  ];

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "120px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="bokeh" />

      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          top: -200,
          right: -200,
          borderRadius: "50%",
          border: "1px solid rgba(255,153,51,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          bottom: -100,
          left: -100,
          borderRadius: "50%",
          border: "1px solid rgba(255,153,51,0.06)",
          pointerEvents: "none",
        }}
      />

      {/* Live badge */}
      <div
        className="anim-fade-up"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          padding: "6px 16px",
          borderRadius: 100,
          background: "rgba(255,153,51,0.08)",
          border: "1px solid rgba(255,153,51,0.25)",
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.1em" }}
        >
          LIVE · SEARCHES INDIA&apos;S ENTIRE INTERNET IN REAL TIME
        </span>
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--green)",
            display: "inline-block",
          }}
          className="anim-green"
        />
      </div>

      {/* Headline */}
      <h1
        className="anim-fade-up-2 font-display gradient-text"
        style={{
          fontSize: "clamp(40px,7vw,96px)",
          fontWeight: 600,
          lineHeight: 1.05,
          maxWidth: 900,
          marginBottom: 24,
          letterSpacing: -1,
        }}
      >
        India&apos;s Most Personal Fashion AI
      </h1>

      {/* Sub */}
      <p
        className="anim-fade-up-3"
        style={{
          fontSize: "clamp(15px,2vw,19px)",
          color: "var(--muted)",
          maxWidth: 580,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        Tell RAZ what you need. She searches{" "}
        <span style={{ color: "var(--cream)" }}>Myntra, AJIO, Nykaa, Amazon.in</span> and 500+
        Indian brands — live, right now — and gives you real links.
      </p>

      {/* Rotating query */}
      <div className="anim-fade-up-4" style={{ marginBottom: 48, minHeight: 56 }}>
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", marginBottom: 8 }}
        >
          PEOPLE ARE ASKING RAZ:
        </div>
        <div style={{ transition: "opacity 0.4s ease", opacity: visible ? 1 : 0 }}>
          <span
            className="font-display"
            style={{
              color: "var(--gold)",
              fontSize: "clamp(17px,2.5vw,24px)",
              fontStyle: "italic",
            }}
          >
            &ldquo;{ROTATING_QUERIES[qi]}&rdquo;
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div
        className="anim-fade-up-5"
        style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}
      >
        <button
          className="btn-gold"
          style={{ padding: "14px 36px", fontSize: 16, borderRadius: 100 }}
          onClick={() => setPage("chat")}
        >
          Start Exploring →
        </button>
        <button
          className="btn-ghost"
          style={{ padding: "14px 36px", fontSize: 16, borderRadius: 100 }}
          onClick={() => setPage("quiz")}
        >
          Find My Style
        </button>
      </div>

      {/* Stats */}
      <div
        className="anim-fade-up-5"
        style={{ display: "flex", flexWrap: "wrap", gap: 40, justifyContent: "center" }}
      >
        {stats.map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div
              className="font-display"
              style={{ fontSize: "clamp(22px,3vw,34px)", color: "var(--gold)", fontWeight: 600 }}
            >
              {n}
            </div>
            <div
              className="font-mono"
              style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.06em" }}
            >
              {l}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.4,
        }}
      >
        <span
          className="font-mono"
          style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--muted)" }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, var(--gold), transparent)",
          }}
        />
      </div>
    </section>
  );
}
