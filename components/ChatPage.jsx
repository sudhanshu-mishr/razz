import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./ProductCard";
import { SUGGESTED_CHIPS } from "../lib/data";

const SEARCH_PHASES = [
  "🔍 Searching Myntra, AJIO, Nykaa Fashion...",
  "🧠 Understanding your style & occasion...",
  "✨ Curating your personalised picks...",
  "🛍 Fetching live prices & availability...",
];

function SearchingIndicator({ phase }) {
  return (
    <div
      className="bubble-raz"
      style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#FF9933,#C1121F)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: "'Space Mono',monospace",
          fontSize: 12,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        R
      </div>
      <div
        className="glass"
        style={{
          borderRadius: 20,
          borderTopLeftRadius: 4,
          padding: "14px 18px",
          border: "1px solid var(--border)",
          minWidth: 280,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="spinner" />
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {SEARCH_PHASES[phase % SEARCH_PHASES.length]}
          </span>
        </div>
        <div
          style={{
            marginTop: 12,
            height: 2,
            background: "var(--surface2)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg,var(--gold),var(--red))",
              borderRadius: 1,
              width: `${((phase + 1) / 4) * 100}%`,
              transition: "width 0.8s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          {["Myntra", "AJIO", "Nykaa", "Amazon.in"].map((s, i) => (
            <span
              key={s}
              className="font-mono"
              style={{
                fontSize: 9,
                color: phase >= i ? "var(--gold)" : "var(--muted)",
                letterSpacing: "0.06em",
                transition: "color 0.4s",
              }}
            >
              {phase >= i ? "✓" : "○"} {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Message({ msg }) {
  if (msg.role === "user") {
    return (
      <div
        className="bubble-user"
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}
      >
        <div
          style={{
            maxWidth: "72%",
            borderRadius: 20,
            borderTopRightRadius: 4,
            padding: "12px 18px",
            background: "rgba(255,153,51,0.12)",
            border: "1px solid rgba(255,153,51,0.25)",
          }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text)" }}>{msg.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bubble-raz"
      style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 20 }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#FF9933,#C1121F)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: "'Space Mono',monospace",
          fontSize: 12,
          fontWeight: 700,
          color: "#fff",
        }}
      >
        R
      </div>

      <div style={{ maxWidth: "88%" }}>
        <div
          className="glass"
          style={{
            borderRadius: 20,
            borderTopLeftRadius: 4,
            padding: "14px 18px",
            marginBottom: 12,
            border: "1px solid var(--border)",
          }}
        >
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text)" }}>{msg.text}</p>
          {msg.searchContext && (
            <div
              style={{
                marginTop: 10,
                fontSize: 11,
                color: "var(--muted)",
                fontFamily: "'Space Mono',monospace",
                borderTop: "1px solid var(--border)",
                paddingTop: 8,
              }}
            >
              🔍 {msg.searchContext}
            </div>
          )}
        </div>

        {/* Products */}
        {msg.products?.length > 0 && (
          <div
            className="scroll-x"
            style={{ gap: 12, paddingBottom: 8, marginBottom: 8 }}
          >
            {msg.products.map((p, i) => (
              <ProductCard key={i} product={p} compact />
            ))}
          </div>
        )}

        {/* No results hint */}
        {msg.products?.length === 0 && !msg.isError && (
          <div style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>
            Try a more specific query — e.g., &ldquo;lehenga for sangeet under ₹10,000&rdquo;
          </div>
        )}

        {/* Style note */}
        {msg.styleNote && (
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)", fontStyle: "italic" }}>
            ✦ RAZ Style Note: {msg.styleNote}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage({ initialQuery, clearInitialQuery }) {
  const [messages, setMessages] = useState([
    {
      role: "raz",
      text: "Namaste! ✨ I'm RAZ — your personal Indian fashion AI. I search Myntra, AJIO, Nykaa Fashion, Amazon.in and 500+ Indian brands live. Ask me anything — in English or Hinglish! Just describe what you're looking for.",
      products: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [phase, setPhase] = useState(0);
  const endRef = useRef(null);
  const phaseRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    if (initialQuery) {
      setInput(initialQuery);
      clearInitialQuery();
    }
  }, [initialQuery, clearInitialQuery]);

  const startPhase = () => {
    setPhase(0);
    phaseRef.current = setInterval(() => setPhase((p) => (p + 1) % 4), 1200);
  };

  const stopPhase = () => {
    if (phaseRef.current) {
      clearInterval(phaseRef.current);
      phaseRef.current = null;
    }
  };

  const sendMessage = useCallback(
    async (queryOverride) => {
      const query = queryOverride || input;
      if (!query.trim() || busy) return;

      setMessages((m) => [...m, { role: "user", text: query }]);
      setInput("");
      setBusy(true);
      startPhase();

      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        stopPhase();
        setBusy(false);

        if (!res.ok) {
          throw new Error(data.message || "Search failed");
        }

        setMessages((m) => [
          ...m,
          {
            role: "raz",
            text: data.message || "Here are your personalised picks!",
            products: data.products || [],
            styleNote: data.style_note,
            searchContext: data.search_context,
          },
        ]);
      } catch (err) {
        stopPhase();
        setBusy(false);
        setMessages((m) => [
          ...m,
          {
            role: "raz",
            text: "Oops! I had trouble searching just now. Please try again — or rephrase your query slightly!",
            products: [],
            isError: true,
          },
        ]);
      }
    },
    [input, busy]
  );

  const handleChip = (chip) => {
    setInput(chip);
    setTimeout(() => document.getElementById("raz-input")?.focus(), 50);
  };

  const recentSearches = [
    "Diwali saree under ₹5000",
    "Wedding lehenga for Jaipur",
    "Office kurta sets",
  ];

  return (
    <div
      style={{
        height: "calc(100vh - 94px)",
        display: "flex",
        overflow: "hidden",
        marginTop: 94,
      }}
    >
      {/* ── Sidebar ── */}
      <div
        className="chat-sidebar"
        style={{
          width: 268,
          borderRight: "1px solid var(--border)",
          overflowY: "auto",
          padding: 18,
          flexShrink: 0,
          background: "rgba(10,10,10,0.75)",
        }}
      >
        {/* Profile */}
        <div
          className="glass"
          style={{ borderRadius: 16, padding: 16, marginBottom: 18, border: "1px solid var(--border)" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#FF9933,#C1121F)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 17,
                color: "#fff",
              }}
            >
              A
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Anjali M.</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Style Profile Active ✦</div>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Fusion Lover", "Budget-conscious", "Ethnic-first"].map((t) => (
              <span
                key={t}
                className="chip"
                style={{ fontSize: 10, padding: "3px 8px", borderRadius: 100 }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Live indicator */}
        <div
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 12,
            padding: "10px 14px",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--green)",
                display: "inline-block",
              }}
            />
            <span
              className="font-mono"
              style={{ fontSize: 10, color: "var(--green)", letterSpacing: "0.06em" }}
            >
              LIVE WEB SEARCH ACTIVE
            </span>
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
            Searches Myntra, AJIO, Nykaa, Amazon.in for real products
          </div>
        </div>

        {/* Recent searches */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 10 }}
        >
          RECENT SEARCHES
        </div>
        {recentSearches.map((s) => (
          <button
            key={s}
            onClick={() => sendMessage(s)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "7px 10px",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--muted)",
              transition: "all 0.2s",
              marginBottom: 2,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.background = "rgba(255,153,51,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.background = "none";
            }}
          >
            🔍 {s}
          </button>
        ))}

        <div className="gold-divider" style={{ margin: "16px 0" }} />

        {/* Collections */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 10 }}
        >
          MY COLLECTIONS
        </div>
        {["Wedding Season Edit 💒", "Navratri 9 Nights 🎉", "Office Week 🏢"].map((c) => (
          <div
            key={c}
            style={{
              padding: "8px 10px",
              borderRadius: 8,
              fontSize: 13,
              color: "var(--text)",
              cursor: "pointer",
              marginBottom: 6,
              border: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            {c}
          </div>
        ))}

        <div className="gold-divider" style={{ margin: "16px 0" }} />

        {/* Preferences */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 10 }}
        >
          STYLE PREFERENCES
        </div>
        {[
          ["Occasion", "Weddings & Festivals"],
          ["Budget", "₹2K–₹8K"],
          ["Size", "M / 38"],
          ["Fabrics", "Silk, Cotton"],
        ].map(([k, v]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <div
              className="font-mono"
              style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.06em" }}
            >
              {k}
            </div>
            <div style={{ fontSize: 13, color: "var(--text)" }}>{v}</div>
          </div>
        ))}
      </div>

      {/* ── Chat window ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Chat header */}
        <div
          style={{
            padding: "10px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(10,10,10,0.85)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--green)",
                  display: "inline-block",
                }}
                className="anim-green"
              />
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                RAZ is live — searching the internet
              </span>
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>
              Real products · Real prices · Real links · Myntra, AJIO, Nykaa &amp; more
            </div>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              color: "var(--green)",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.25)",
              padding: "3px 8px",
              borderRadius: 2,
            }}
          >
            WEB SEARCH ON
          </span>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px 18px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((msg, i) => (
            <Message key={i} msg={msg} />
          ))}
          {busy && <SearchingIndicator phase={phase} />}
          <div ref={endRef} />
        </div>

        {/* Suggestion chips */}
        <div
          className="scroll-x"
          style={{
            borderTop: "1px solid var(--border)",
            padding: "10px 16px 8px",
          }}
        >
          {SUGGESTED_CHIPS.map((c) => (
            <button
              key={c}
              className="chip"
              style={{ flexShrink: 0, padding: "5px 12px", borderRadius: 100, fontSize: 12 }}
              onClick={() => handleChip(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Input row */}
        <div
          style={{
            padding: "10px 14px 16px",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          <button
            title="Upload photo"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "none",
              border: "1px solid var(--border)",
              cursor: "pointer",
              color: "var(--muted)",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            📎
          </button>

          <textarea
            id="raz-input"
            className="chat-input"
            rows={2}
            placeholder="Describe what you're looking for... (e.g. 'silk saree for Diwali under ₹4,000' or 'kuch hatke for sangeet')"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            style={{
              padding: "12px 16px",
              fontSize: 14,
              lineHeight: 1.6,
              minHeight: 52,
              maxHeight: 120,
              borderRadius: 16,
              flex: 1,
            }}
          />

          <button
            title="Voice search"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "none",
              border: "1px solid var(--border)",
              cursor: "pointer",
              color: "var(--muted)",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            🎤
          </button>

          <button
            className="btn-gold"
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              flexShrink: 0,
              fontSize: 20,
            }}
            onClick={() => sendMessage()}
            disabled={busy || !input.trim()}
          >
            {busy ? <div className="spinner" /> : "→"}
          </button>
        </div>
      </div>
    </div>
  );
}
