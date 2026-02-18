import { useState } from "react";
import { ArrowLeft, AlertTriangle, Info, Clock, TrendingDown, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { C, font, PageHeader } from "./TrafficSigns";

const demeritData = [
  { points: 7, color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", violations: ["Failing to remain at the scene of a collision"] },
  { points: 6, color: "#dc2626", bg: "#fef2f2", border: "#fecaca", violations: ["Careless driving", "Exceeding the speed limit by 50 km/h or more", "Racing", "Failing to stop for a school bus"] },
  { points: 5, color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", violations: ["Driver of bus failing to stop at unprotected railway crossing"] },
  { points: 4, color: "#d97706", bg: "#fffbeb", border: "#fde68a", violations: ["Exceeding the speed limit by 30 to 49 km/h", "Following too closely"] },
  { points: 3, color: "#ca8a04", bg: "#fefce8", border: "#fef08a", violations: ["Exceeding the speed limit by 16 to 29 km/h", "Improper driving where road is divided into lanes", "Crowding the driver's seat", "Going the wrong way on a one-way street", "Driving or operating a vehicle on a closed road", "Crossing a divided road where no proper crossing is provided", "Improper passing", "Improper use of high occupancy vehicle lane", "Driving through, around or under a railway crossing barrier", "Failing to yield the right-of-way", "Failing to obey a stop sign, traffic light or railway crossing signal", "Failing to obey the directions of a police officer", "Driving the wrong way on a divided road", "Failing to report a collision with over $1000 in damages or causing injury to a police officer"] },
  { points: 2, color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", violations: ["Failing to lower headlight beam", "Improper opening of a vehicle door", "Prohibited turns", "Towing people—on toboggans, bicycles, skis, for example", "Failing to obey signs", "Failing to stop at a pedestrian crossing", "Failing to share the road", "Improper right turn", "Improper left turn", "Failing to signal", "Unnecessary slow driving", "Reversing on a divided high-speed road", "Driver failing to wear a seat belt", "Driver failing to ensure passenger under 16 years wearing seat belt", "Backing on a highway", "Driver failing to ensure infant/child passenger is properly secured in an appropriate child restraint system or booster seat"] },
];

const infoCards = [
  {
    icon: <Info size={22} color="#1a56db" />,
    iconBg: "#eef2ff",
    title: "How the System Works",
    items: [
      "Demerit points stay on your record for 2 years from the date of offence",
      "Points are added for each convicted traffic violation",
      "Accumulating too many points can lead to licence suspension",
      "Different point thresholds trigger different consequences",
    ],
  },
  {
    icon: <AlertTriangle size={22} color="#dc2626" />,
    iconBg: "#fef2f2",
    title: "Warning Thresholds",
    items: [
      "9 points → Warning letter & possible interview to explain why licence shouldn't be suspended",
      "15 points → Automatic 30-day licence suspension for fully licensed (G) drivers",
      "9 points → 60-day suspension for G1 & G2 drivers",
    ],
  },
  {
    icon: <TrendingDown size={22} color="#059669" />,
    iconBg: "#ecfdf5",
    title: "After Suspension",
    items: [
      "After a 30-day suspension (G drivers): record reduces to 7 points",
      "After a 60-day suspension (G1/G2): record reduces to 4 points",
      "Points do NOT reset to zero after suspension",
      "Continued violations can lead to further suspension",
    ],
  },
  {
    icon: <Clock size={22} color="#d97706" />,
    iconBg: "#fffbeb",
    title: "Point Duration",
    items: [
      "All demerit points remain on record for exactly 2 years from date of offence",
      "After 2 years, points from that offence are automatically removed",
      "Keeping a clean record is the best way to manage your points",
    ],
  },
];

const alcoholCards = [
  { title: "G1 & G2 Drivers — Zero Tolerance", highlight: true, items: ["Blood alcohol level must be exactly 0.00%", "First offence: 90-day licence suspension", "Refusing breathalyzer: 90-day immediate suspension", "Accompanying driver must have BAC under 0.05%"] },
  { title: "Fully Licensed (G) Drivers", highlight: false, items: ["Convicted of drinking & driving: 1-year licence suspension on first offence", "Impaired driving conviction at 0.08% BAC or higher", "At 0.05%–0.079% BAC: 3-day immediate roadside suspension", "Refusing breathalyzer: treated same as impaired driving"] },
];

function ExpandableCard({ title, icon, iconBg, items }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: C.white, border: `1px solid ${C.n200}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", alignItems: "center", padding: "18px 22px", cursor: "pointer", gap: 14 }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
        <span style={{ flex: 1, fontWeight: 700, fontSize: "1rem", color: C.n800 }}>{title}</span>
        <div style={{ width: 28, height: 28, borderRadius: 7, background: C.n100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {open ? <ChevronUp size={14} color={C.n500} /> : <ChevronDown size={14} color={C.n500} />}
        </div>
      </div>
      {open && (
        <div style={{ padding: "0 22px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", background: C.n50, borderRadius: 9 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary, marginTop: 7, flexShrink: 0 }} />
              <span style={{ color: C.n700, fontSize: "0.9rem", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DemeritInfo({ onBack }) {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="⚠️ Demerit Points System" onBack={onBack} />

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg,${C.n900} 0%,#1a3460 100%)`, padding: "48px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)", color: C.accent, padding: "5px 16px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
          <Shield size={13} /> Ontario Driving Law
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: C.white, margin: "0 0 14px", letterSpacing: "-0.02em" }}>Demerit Point System</h1>
        <p style={{ color: C.n400, fontSize: "1rem", maxWidth: 500, margin: "0 auto", lineHeight: 1.75 }}>Understanding demerit points is essential for keeping your licence and staying safe on Ontario roads.</p>
        {/* Quick stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 36, flexWrap: "wrap" }}>
          {[["2 yrs","Points stay on record"],["9 pts","Warning threshold"],["15 pts","Auto suspension (G)"],["0.00%","BAC limit for G1/G2"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <span style={{ display: "block", fontSize: "1.7rem", fontWeight: 900, color: C.white }}>{n}</span>
              <span style={{ display: "block", fontSize: "0.72rem", color: C.n400, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "36px 20px 72px" }}>
        {/* Info cards grid */}
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: C.n800, margin: "0 0 20px" }}>Key Rules & Thresholds</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginBottom: 40 }}>
          {infoCards.map((card, i) => <ExpandableCard key={i} {...card} />)}
        </div>

        {/* Demerit table */}
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: C.n800, margin: "0 0 20px" }}>Violations & Points</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {demeritData.map((cat, ci) => {
            const open = expandedRow === ci;
            return (
              <div key={ci} style={{ background: C.white, border: `2px solid ${open ? cat.border : C.n200}`, borderRadius: 16, overflow: "hidden", boxShadow: open ? `0 4px 20px ${cat.border}80` : "0 2px 8px rgba(0,0,0,0.04)", transition: "border-color 0.2s, box-shadow 0.2s" }}>
                <div onClick={() => setExpandedRow(open ? null : ci)} style={{ display: "flex", alignItems: "center", padding: "16px 20px", cursor: "pointer", gap: 16 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: cat.bg, border: `2px solid ${cat.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "1.4rem", fontWeight: 900, color: cat.color, lineHeight: 1 }}>{cat.points}</span>
                    <span style={{ fontSize: "0.6rem", color: cat.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>pts</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.n800, fontSize: "0.95rem", marginBottom: 4 }}>{cat.points} Demerit Point{cat.points > 1 ? "s" : ""}</div>
                    <div style={{ color: C.n500, fontSize: "0.82rem" }}>{cat.violations.length} violation{cat.violations.length > 1 ? "s" : ""}</div>
                  </div>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: open ? cat.bg : C.n100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {open ? <ChevronUp size={14} color={cat.color} /> : <ChevronDown size={14} color={C.n500} />}
                  </div>
                </div>
                {open && (
                  <div style={{ padding: "0 20px 18px", borderTop: `1px solid ${C.n100}` }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 14 }}>
                      {cat.violations.map((v, vi) => (
                        <div key={vi} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 14px", background: cat.bg, borderRadius: 9, border: `1px solid ${cat.border}` }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: cat.color, marginTop: 7, flexShrink: 0 }} />
                          <span style={{ color: C.n700, fontSize: "0.88rem", lineHeight: 1.6 }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Alcohol section */}
        <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: C.n800, margin: "0 0 20px" }}>Alcohol & Impaired Driving</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16, marginBottom: 40 }}>
          {alcoholCards.map((card, i) => (
            <div key={i} style={{ background: card.highlight ? `linear-gradient(135deg,${C.danger} 0%,#991b1b 100%)` : C.white, border: card.highlight ? "none" : `1px solid ${C.n200}`, borderRadius: 16, padding: "24px", boxShadow: card.highlight ? "0 8px 30px rgba(220,38,38,0.25)" : "0 2px 10px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: card.highlight ? C.white : C.n800, margin: "0 0 16px" }}>{card.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {card.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: card.highlight ? "rgba(255,255,255,0.6)" : C.danger, marginTop: 8, flexShrink: 0 }} />
                    <span style={{ color: card.highlight ? "rgba(255,255,255,0.85)" : C.n700, fontSize: "0.88rem", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Safety reminder */}
        <div style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, borderRadius: 20, padding: "32px 32px", color: C.white }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}><Shield size={22} color={C.white} /></div>
            <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800 }}>Stay Safe, Drive Smart</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {["Always obey traffic laws and speed limits","Never drive under the influence of alcohol or drugs","Always wear your seatbelt and ensure passengers do too","Give pedestrians and cyclists the right-of-way","Maintain a safe following distance at all times","Stay focused and avoid distractions while driving"].map((tip, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,0.12)", borderRadius: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent, marginTop: 8, flexShrink: 0 }} />
                <span style={{ color: "rgba(255,255,255,0.88)", fontSize: "0.87rem", lineHeight: 1.55 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}