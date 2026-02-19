import { useState } from "react";
import TrafficSigns from "./components/TrafficSigns";
import RulesOfTheRoad from "./components/RulesOfTheRoad";
import DemeritInfo from "./components/DemeritInfo";
import { C, font } from "./components/TrafficSigns";
import { ChevronRight } from "lucide-react";

const sections = [
  { key: "traffic-signs", label: "Traffic Signs", emoji: "🚦", count: "77 Questions" },
  { key: "rules", label: "Rules of the Road", emoji: "📖", count: "123 Questions" },
  { key: "demerit", label: "Demerit Points", emoji: "⚠️", count: "Reference Guide" },
];

function HomePage({ onSelect }) {
  const [hov, setHov] = useState(null);

  const infoCards = [
    {
      emoji: "📝",
      title: "Knowledge Test Format",
      color: C.primary,
      colorBg: C.primaryLight,
      points: [
        "40 multiple choice questions total",
        "20 questions on traffic signs",
        "20 questions on general driving knowledge",
        "Maximum 4 incorrect per section to pass",
        "$10 fee to re-write if you fail (after 3 working days)",
      ],
    },
    {
      emoji: "🎯",
      title: "What to Bring",
      color: "#059669",
      colorBg: "#ecfdf5",
      points: [
        "$125 fee (includes knowledge test + first G1 road test + 5-year licence)",
        "Proof of identity and date of birth",
        "Eye glasses if needed for driving or reading",
        "Expired foreign licence if applicable",
      ],
    },
    {
      emoji: "🚗",
      title: "G1 Restrictions",
      color: "#d97706",
      colorBg: "#fffbeb",
      points: [
        "Must be accompanied by a fully licensed G driver with 4+ years experience",
        "Blood alcohol level must be exactly 0.00%",
        "No driving on 400-series highways or high-speed expressways",
        "No driving between midnight and 5:00 a.m.",
      ],
    },
    {
      emoji: "📚",
      title: "Study Tips",
      color: "#7c3aed",
      colorBg: "#f5f3ff",
      points: [
        "Use Practice Mode to learn all 77 signs and 50+ rules questions",
        "Use Test Mode to simulate exam conditions before test day",
        "Aim for 90%+ in practice before attempting the real test",
        "Review the Demerit Points system — it's on the test!",
      ],
    },
  ];

  return (
    <div style={{ fontFamily: font }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(145deg,${C.n900} 0%,#1a3460 60%,${C.n900} 100%)`, padding: "64px 24px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: C.accent, padding: "5px 18px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 24 }}>
          🇨🇦 Ontario, Canada
        </div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, color: C.white, margin: "0 0 16px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          G1 Driver's Test<br /><span style={{ color: C.accent }}>Study Guide</span>
        </h1>
        <p style={{ color: C.n400, fontSize: "1.05rem", maxWidth: 500, margin: "0 auto 48px", lineHeight: 1.75 }}>
          Everything you need to pass your Ontario G1 knowledge test. 200 practice questions across two sections, plus a complete demerit points reference.
        </p>

        {/* Section cards */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", maxWidth: 860, margin: "0 auto" }}>
          {sections.map(sec => (
            <div key={sec.key} onClick={() => onSelect(sec.key)} onMouseEnter={() => setHov(sec.key)} onMouseLeave={() => setHov(null)} style={{ flex: "1 1 220px", maxWidth: 260, background: hov === sec.key ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: "28px 22px", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 10, transform: hov === sec.key ? "translateY(-6px)" : "none", boxShadow: hov === sec.key ? "0 20px 50px rgba(0,0,0,0.4)" : "none", transition: "all 0.2s ease" }}>
              <span style={{ fontSize: "2rem" }}>{sec.emoji}</span>
              <div style={{ fontWeight: 800, color: C.white, fontSize: "1rem" }}>{sec.label}</div>
              <div style={{ fontSize: "0.78rem", color: C.n400, fontWeight: 600 }}>{sec.count}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, color: C.accent, fontSize: "0.8rem", fontWeight: 700, marginTop: 4 }}>
                Start Studying <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 52, flexWrap: "wrap" }}>
          {[["200+","Practice Questions"],["2","Test Sections"],["80%","Pass Mark"],["40","Real Test Qs"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "2rem", fontWeight: 900, color: C.white }}>{n}</span>
              <span style={{ display: "block", fontSize: "0.7rem", color: C.n400, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info cards */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "48px 20px 72px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: C.n800, margin: "0 0 24px", textAlign: "center" }}>Test Information & Tips</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {infoCards.map((card, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.n200}`, borderRadius: 18, padding: "24px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: card.colorBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{card.emoji}</div>
                <h3 style={{ margin: 0, fontSize: "0.98rem", fontWeight: 800, color: C.n800 }}>{card.title}</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {card.points.map((pt, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: card.color, marginTop: 8, flexShrink: 0 }} />
                    <span style={{ color: C.n600, fontSize: "0.88rem", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <main>
        {active === "home" && <HomePage onSelect={setActive} />}
        {active === "traffic-signs" && <TrafficSigns onBack={() => setActive("home")} />}
        {active === "rules" && <RulesOfTheRoad onBack={() => setActive("home")} />}
        {active === "demerit" && <DemeritInfo onBack={() => setActive("home")} />}
      </main>

      {active === "home" && (
        <footer style={{ background: C.n900, color: C.n400, textAlign: "center", padding: "28px 24px", fontSize: "0.82rem", lineHeight: 1.8 }}>
          <p style={{ margin: 0 }}>📍 Mississauga, Ontario, CA · Study well and drive safely! 🚦</p>
          <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: C.n500 }}>This is a study guide only. Always refer to the official Ontario Driver's Handbook for the most up-to-date information.</p>
        </footer>
      )}
    </div>
  );
}