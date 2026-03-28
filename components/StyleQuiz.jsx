import { useState } from "react";
import { QUIZ_QUESTIONS, STYLE_PERSONAS } from "../lib/data";

function getPersonaIndex(answers) {
  const city = answers[3]?.[0] || "";
  const style = answers[0]?.[0] || "";
  if (city.includes("Mumbai")) return 0;
  if (city.includes("Delhi")) return 1;
  if (city.includes("Jaipur")) return 3;
  if (city.includes("Bangalore")) return 3;
  if (city.includes("Chennai")) return 4;
  if (city.includes("Kolkata")) return 5;
  if (style.includes("Ethnic")) return 2;
  if (style.includes("Western")) return 0;
  return Math.floor(Math.random() * STYLE_PERSONAS.length);
}

function getPercent(answers) {
  const s = answers[0]?.[0] || "";
  if (s.includes("Ethnic"))       return [70, 15, 15];
  if (s.includes("Western"))      return [15, 70, 15];
  if (s.includes("Fusion"))       return [30, 30, 40];
  if (s.includes("Experimental")) return [25, 25, 50];
  return [40, 30, 30];
}

function getBrandMatches(answers) {
  const budget = answers[2]?.[0] || "";
  const style  = answers[0]?.[0] || "";
  if (budget.includes("15K+"))   return ["Sabyasachi", "Anita Dongre", "Raw Mango"];
  if (budget.includes("5K–15K")) return ["Aza Fashions", "Nykaa Fashion", "Global Desi"];
  if (style.includes("Ethnic"))  return ["Fabindia", "Biba", "W for Woman"];
  return ["Fabindia", "Anita Dongre", "AND"];
}

function DNAChart({ eth, west, fus }) {
  const r    = 54;
  const circ = 2 * Math.PI * r;
  const ea   = circ * eth  / 100;
  const wa   = circ * west / 100;
  const fa   = circ * fus  / 100;

  return (
    <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 28px" }}>
      <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,153,51,0.15)" strokeWidth="12" />
        <circle
          className="dna-ring"
          cx="70" cy="70" r={r}
          fill="none" stroke="var(--gold)" strokeWidth="12"
          strokeDasharray={`${ea} ${circ - ea}`}
        />
        <circle
          className="dna-ring"
          cx="70" cy="70" r={r}
          fill="none" stroke="var(--red)" strokeWidth="12"
          strokeDasharray={`${wa} ${circ - wa}`}
          strokeDashoffset={-ea}
        />
        <circle
          className="dna-ring"
          cx="70" cy="70" r={r}
          fill="none" stroke="var(--cream)" strokeWidth="12"
          strokeDasharray={`${fa} ${circ - fa}`}
          strokeDashoffset={-(ea + wa)}
        />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
        }}
      >
        <div
          className="font-display"
          style={{ fontSize: 28, color: "var(--gold)", fontWeight: 700 }}
        >
          {eth}%
        </div>
        <div style={{ fontSize: 10, color: "var(--muted)" }}>Ethnic</div>
      </div>
    </div>
  );
}

function ResultScreen({ answers, setPage, onRetake }) {
  const [eth, west, fus] = getPercent(answers);
  const persona          = STYLE_PERSONAS[getPersonaIndex(answers)];
  const brands           = getBrandMatches(answers);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 94px)",
        marginTop: 94,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        position: "relative",
      }}
    >
      <div className="bokeh" />

      <div
        className="glass gold-glow"
        style={{
          maxWidth: 520,
          width: "100%",
          borderRadius: 28,
          padding: 40,
          border: "1px solid var(--border)",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--gold)", letterSpacing: "0.12em", marginBottom: 14 }}
        >
          YOUR RAZ STYLE PROFILE
        </div>

        <div
          className="font-display anim-glow"
          style={{
            fontSize: "clamp(18px,4vw,32px)",
            color: "var(--cream)",
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          &ldquo;{persona}&rdquo;
        </div>

        <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 32 }}>
          Curated by RAZ AI based on your answers
        </p>

        <DNAChart eth={eth} west={west} fus={fus} />

        {/* Legend */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            marginBottom: 28,
          }}
        >
          {[
            ["Ethnic",  eth,  "var(--gold)"],
            ["Western", west, "var(--red)"],
            ["Fusion",  fus,  "var(--cream)"],
          ].map(([label, val, col]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 10, height: 10,
                  borderRadius: "50%",
                  background: col,
                  margin: "0 auto 4px",
                }}
              />
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: col }}>{val}%</div>
            </div>
          ))}
        </div>

        {/* Top brands */}
        <div
          className="font-mono"
          style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.08em", marginBottom: 12 }}
        >
          YOUR TOP BRAND MATCHES
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 28,
          }}
        >
          {brands.map((b) => (
            <span
              key={b}
              className="chip"
              style={{ padding: "5px 14px", borderRadius: 100 }}
            >
              {b}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            className="btn-gold"
            style={{ padding: "12px 28px", fontSize: 14, borderRadius: 100 }}
            onClick={() => setPage("chat")}
          >
            Shop My Style →
          </button>
          <button
            className="btn-ghost"
            style={{ padding: "12px 28px", fontSize: 14, borderRadius: 100 }}
          >
            Share DNA ↗
          </button>
        </div>

        <button
          className="btn-ghost"
          style={{ padding: "8px 20px", fontSize: 12, borderRadius: 100, marginTop: 14, width: "100%" }}
          onClick={onRetake}
        >
          Retake Quiz
        </button>
      </div>
    </div>
  );
}

export default function StyleQuiz({ setPage }) {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState({});
  const [done,    setDone]    = useState(false);

  const q      = QUIZ_QUESTIONS[step];
  const isMulti = q?.type === "m";
  const total   = QUIZ_QUESTIONS.length;

  const toggle = (opt) => {
    setAnswers((a) => {
      const curr = a[step] || [];
      if (isMulti) {
        return {
          ...a,
          [step]: curr.includes(opt) ? curr.filter((x) => x !== opt) : [...curr, opt],
        };
      }
      return { ...a, [step]: [opt] };
    });
  };

  const next = () => {
    if (step < total - 1) setStep((s) => s + 1);
    else setDone(true);
  };

  const retake = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  if (done) {
    return <ResultScreen answers={answers} setPage={setPage} onRetake={retake} />;
  }

  const selected = answers[step] || [];

  return (
    <div
      style={{
        minHeight: "calc(100vh - 94px)",
        marginTop: 94,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
      }}
    >
      <div className="bokeh" />

      <div style={{ maxWidth: 620, width: "100%", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div
            className="font-mono"
            style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "0.08em" }}
          >
            STYLE QUIZ · {step + 1}/{total}
          </div>
          {step > 0 && (
            <button
              className="btn-ghost"
              style={{ padding: "4px 14px", fontSize: 12, borderRadius: 100 }}
              onClick={() => setStep((s) => s - 1)}
            >
              ← Back
            </button>
          )}
        </div>

        {/* Progress bar */}
        <div className="quiz-progress-bar" style={{ marginBottom: 36 }}>
          <div
            className="quiz-progress-fill"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div key={step} style={{ animation: "fadeUp 0.4s ease forwards" }}>
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(20px,4vw,38px)",
              color: "var(--cream)",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Q{step + 1}. {q.q}
          </h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
            {isMulti ? "Select all that apply" : "Choose one"}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
              gap: 12,
            }}
          >
            {q.options.map((opt) => (
              <button
                key={opt}
                className={`quiz-option ${selected.includes(opt) ? "selected" : ""}`}
                style={{ borderRadius: 16, padding: "14px 18px" }}
                onClick={() => toggle(opt)}
              >
                <span style={{ fontSize: 15 }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Next */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
          <button
            className="btn-gold"
            style={{
              padding: "12px 32px",
              fontSize: 15,
              borderRadius: 100,
              opacity: selected.length > 0 ? 1 : 0.45,
            }}
            onClick={next}
            disabled={selected.length === 0}
          >
            {step === total - 1 ? "See My Style Profile →" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
