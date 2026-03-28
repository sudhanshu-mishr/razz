import { useState, useCallback } from "react";
import Head from "next/head";

import Nav               from "../components/Nav";
import Hero              from "../components/Hero";
import HowItWorks        from "../components/HowItWorks";
import OccasionExplorer  from "../components/OccasionExplorer";
import TrendingSection   from "../components/TrendingSection";
import BrandsSection     from "../components/BrandsSection";
import ChatPage          from "../components/ChatPage";
import StyleQuiz         from "../components/StyleQuiz";
import Collections       from "../components/Collections";
import Footer            from "../components/Footer";

/* ─── CTA banner at the bottom of the home page ─── */
function CTABanner({ setPage }) {
  return (
    <section
      className="section"
      style={{ textAlign: "center", position: "relative", overflow: "hidden" }}
    >
      <div className="bokeh" />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          className="font-mono"
          style={{
            fontSize: 11,
            color: "var(--gold)",
            letterSpacing: "0.12em",
            marginBottom: 14,
          }}
        >
          START YOUR JOURNEY
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(28px,6vw,72px)",
            color: "var(--cream)",
            fontWeight: 600,
            marginBottom: 16,
            lineHeight: 1.1,
          }}
        >
          Your style secret
          <br />
          awaits, darling.
        </h2>
        <p style={{ fontSize: 16, color: "var(--muted)", marginBottom: 36 }}>
          India&apos;s most intelligent fashion discovery platform. Powered by live web search.
        </p>
        <div
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            className="btn-gold"
            style={{ padding: "16px 40px", fontSize: 16, borderRadius: 100 }}
            onClick={() => setPage("chat")}
          >
            Chat with RAZ →
          </button>
          <button
            className="btn-ghost"
            style={{ padding: "16px 40px", fontSize: 16, borderRadius: 100 }}
            onClick={() => setPage("quiz")}
          >
            Take Style Quiz
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Home page assembly ─── */
function HomePage({ setPage, setInitialQuery }) {
  return (
    <>
      <Hero setPage={setPage} />
      <div className="gold-divider" />
      <HowItWorks />
      <div className="gold-divider" />
      <OccasionExplorer setPage={setPage} setInitialQuery={setInitialQuery} />
      <div className="gold-divider" />
      <TrendingSection />
      <div className="gold-divider" />
      <BrandsSection />
      <div className="gold-divider" />
      <CTABanner setPage={setPage} />
    </>
  );
}

/* ─── Floating chat button ─── */
function FloatingChatBtn({ page, setPage }) {
  if (page === "chat") return null;
  return (
    <button
      className="btn-gold anim-bounce"
      title="Chat with RAZ"
      onClick={() => setPage("chat")}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 200,
        width: 56,
        height: 56,
        borderRadius: "50%",
        fontSize: 22,
        boxShadow: "0 8px 32px rgba(255,153,51,0.4)",
        border: "none",
        cursor: "pointer",
      }}
    >
      💬
    </button>
  );
}

/* ─── Root page ─── */
export default function Home() {
  const [page,         setPage]         = useState("home");
  const [initialQuery, setInitialQuery] = useState("");

  const clearInitialQuery = useCallback(() => setInitialQuery(""), []);

  /* Which sections show a footer */
  const showFooter = page !== "chat";

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage setPage={setPage} setInitialQuery={setInitialQuery} />;

      case "chat":
        return (
          <ChatPage
            initialQuery={initialQuery}
            clearInitialQuery={clearInitialQuery}
          />
        );

      case "quiz":
        return <StyleQuiz setPage={setPage} />;

      case "collections":
        return <Collections />;

      case "trending":
        return (
          <div style={{ marginTop: 94 }}>
            <TrendingSection />
          </div>
        );

      case "brands":
        return (
          <div style={{ marginTop: 94 }}>
            <BrandsSection />
          </div>
        );

      default:
        return <HomePage setPage={setPage} setInitialQuery={setInitialQuery} />;
    }
  };

  return (
    <>
      <Head>
        <title>RAZ AI — India&apos;s Fashion Intelligence</title>
      </Head>

      {/* Fixed rangoli background pattern */}
      <div className="rangoli-bg" />

      {/* Sticky nav always on top */}
      <Nav page={page} setPage={setPage} />

      {/* Page content */}
      <main style={{ position: "relative", zIndex: 1 }}>
        {renderPage()}
      </main>

      {/* Footer (not on chat page) */}
      {showFooter && <Footer setPage={setPage} />}

      {/* Floating chat button */}
      <FloatingChatBtn page={page} setPage={setPage} />
    </>
  );
}
