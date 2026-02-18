import { useState } from "react";
import { BookOpen, ClipboardList, RotateCcw, CheckCircle, XCircle, Trophy, ArrowLeft, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";

// ── Shared design tokens (exported for other components) ──────────────────────
export const C = {
  primary: "#1a56db", primaryLight: "#eef2ff",
  accent: "#f59e0b",
  success: "#059669", successBg: "#ecfdf5",
  danger: "#dc2626", dangerBg: "#fef2f2",
  n50: "#f8fafc", n100: "#f1f5f9", n200: "#e2e8f0", n300: "#cbd5e1",
  n400: "#94a3b8", n500: "#64748b", n600: "#475569", n700: "#334155",
  n800: "#1e293b", n900: "#0f172a", white: "#ffffff",
};
export const font = "'Segoe UI', system-ui, -apple-system, sans-serif";
export const LETTERS = ["A", "B", "C", "D"];

export const stateStyles = {
  default:  { bg: C.n100,       border: "transparent", textColor: C.n700,   letterBg: C.n300,    letterColor: C.white },
  selected: { bg: C.primaryLight, border: C.primary,   textColor: C.primary, letterBg: C.primary, letterColor: C.white },
  correct:  { bg: C.successBg,  border: C.success,     textColor: C.success, letterBg: C.success, letterColor: C.white },
  wrong:    { bg: C.dangerBg,   border: C.danger,      textColor: C.danger,  letterBg: C.danger,  letterColor: C.white },
  missed:   { bg: C.successBg,  border: C.success,     textColor: C.success, letterBg: C.success, letterColor: C.white },
};

// ── Shared Page Header ────────────────────────────────────────────────────────
export function PageHeader({ title, onBack, rightEl }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.n200}`, padding: "0 24px", position: "sticky", top: 0, zIndex: 100, display: "flex", alignItems: "center", gap: 16, height: 64, fontFamily: font }}>
      <button style={{ display: "flex", alignItems: "center", gap: 6, background: hov ? C.n100 : "none", border: `1px solid ${C.n200}`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: C.n700, fontSize: "0.875rem", fontWeight: 600, transition: "background 0.15s" }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onBack}>
        <ArrowLeft size={15} /> Back
      </button>
      <span style={{ flex: 1, fontWeight: 700, fontSize: "1.05rem", color: C.n800 }}>{title}</span>
      {rightEl}
    </div>
  );
}

// ── Sign image with fallback ──────────────────────────────────────────────────
function SignImage({ id, size = 110 }) {
  const [err, setErr] = useState(false);
  if (err) return <div style={{ width: size, height: size, background: C.n200, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.n400, fontSize: "0.65rem", textAlign: "center" }}>No image</div>;
  return <img src={new URL(`../assets/${id}.png`, import.meta.url).href} alt={`Sign ${id}`} onError={() => setErr(true)} style={{ width: size, height: size, objectFit: "contain", borderRadius: 8 }} />;
}

const trafficSignsData = [
  { id: 1, question: "What does this sign mean?", options: ["Road slippery when wet", "No right turn permitted", "No left turn permitted", "You must not make a 'U' turn"], correctAnswer: 3 },
  { id: 2, question: "What does this sign mean?", options: ["Hidden intersection ahead", "Winding road", "Road slippery when wet", "Narrow road ahead"], correctAnswer: 1 },
  { id: 3, question: "What does this sign mean?", options: ["No entry into the intersection", "This sign means no stopping", "Vehicles approaching from angle shown, must stop", "Need not stop for stop signs in direction of arrows"], correctAnswer: 1 },
  { id: 4, question: "What does this sign mean?", options: ["Traffic signal ahead", "Stop sign 150 metres (500 feet) ahead", "Bump 120 metres (400 feet) ahead", "Railway crossing ahead"], correctAnswer: 0 },
  { id: 5, question: "What does this sign mean?", options: ["Winding road ahead", "Bumpy road ahead", "Road ahead slippery when wet", "No passing ahead"], correctAnswer: 2 },
  { id: 6, question: "What does this sign mean?", options: ["Playground zone sign", "Children playing in residential area", "School zone sign", "Direction sign for children"], correctAnswer: 2 },
  { id: 7, question: "What does this sign mean?", options: ["Divided highway ahead", "You are approaching a one-way street", "Hidden intersection ahead", "Pavement narrows"], correctAnswer: 3 },
  { id: 8, question: "What does this sign mean?", options: ["Narrow road ahead", "Hidden intersection ahead", "Railway crossing ahead", "Intersection ahead"], correctAnswer: 3 },
  { id: 9, question: "What does this sign mean?", options: ["Divided highway ahead", "Divided road ends, keep to the right", "Narrow bridge ahead", "Road under construction"], correctAnswer: 1 },
  { id: 10, question: "What does this sign mean?", options: ["Right lane ends", "Hidden intersection ahead", "You are approaching steep hill", "Passing is not allowed"], correctAnswer: 3 },
  { id: 11, question: "What does this sign mean?", options: ["Narrow road ahead", "Road ahead turns left then right", "Road ahead turns right then left", "Intersection ahead"], correctAnswer: 2 },
  { id: 12, question: "What does this sign mean?", options: ["Stop sign ahead", "Yield right-of-way", "Dead end street ahead", "Slow moving vehicle ahead"], correctAnswer: 0 },
  { id: 13, question: "A green circle means:", options: ["Truck route", "No trucks", "Route for large trucks", "Permissive sign"], correctAnswer: 3 },
  { id: 14, question: "What does this sign mean?", options: ["Keep to right", "Keep to left", "Keep out (Do not enter)", "Do not pass"], correctAnswer: 2 },
  { id: 15, question: "What does this sign mean?", options: ["Construction sign—slow down obey flagman's direction", "A construction sign replacing flagman on duty", "Regulatory sign—reduce speed", "This sign warns of road work operation ahead"], correctAnswer: 3 },
  { id: 16, question: "What does this sign mean?", options: ["Policemen at intersection", "You will get a ticket if you do not obey traffic signal", "Stop for red light at intersection", "Red light camera at intersection"], correctAnswer: 3 },
  { id: 17, question: "What does this sign mean?", options: ["Deer regularly cross, be alert for animals", "Zoo ahead", "No honking at animals", "Deers are welcome"], correctAnswer: 0 },
  { id: 18, question: "What does this sign mean?", options: ["Truck entrance on the right side ahead", "No truck allows", "Slow down for truck", "Truck route"], correctAnswer: 0 },
  { id: 19, question: "What does this sign mean?", options: ["No right turn", "Divided highway ends", "Narrow bridge ahead", "No right turn on red"], correctAnswer: 3 },
  { id: 20, question: "What does this sign mean?", options: ["You may exit if you remain in right hand lane", "You must not drive in right hand lane under any circumstances", "End of highway, you must move into right hand lane", "Two-way turn lane"], correctAnswer: 3 },
  { id: 21, question: "What does this sign mean?", options: ["X-intersection for school vehicles", "School crosswalk sign", "Caution—school bus crossing", "Regulatory sign"], correctAnswer: 3 },
  { id: 22, question: "What does this sign mean?", options: ["School area ahead", "Railway crossing ahead", "You must give the right-of-way", "You have the right-of-way"], correctAnswer: 2 },
  { id: 23, question: "What does this sign mean?", options: ["Stop sign 150 meters (500 feet) ahead", "Bump 120 meters (400 feet) ahead", "Stop at all times", "Stop only if other vehicles are approaching"], correctAnswer: 2 },
  { id: 24, question: "What does this sign mean?", options: ["You must make a right turn only", "You must not make a left turn", "Hidden intersection ahead", "You are approaching a traffic island"], correctAnswer: 1 },
  { id: 25, question: "What does this sign mean?", options: ["No Bicycles allowed", "Do not drive through", "Bicycle route", "No parking"], correctAnswer: 2 },
  { id: 26, question: "What does this sign mean?", options: ["Snowmobiles may not use this road", "Snowmobile parking only", "Snowmobiles may use this road", "Snowmobile repair shop ahead"], correctAnswer: 2 },
  { id: 27, question: "What does this sign mean?", options: ["You may park in the designated area during the posted times", "You may not park between the signs during the posted times", "No parking", "Weekend parking only"], correctAnswer: 0 },
  { id: 28, question: "What does this sign mean?", options: ["Bicycles are allowed on this road", "No bicycles allowed on this road", "No parking", "No stopping"], correctAnswer: 1 },
  { id: 29, question: "What does this sign mean?", options: ["Care for pedestrian", "Watch for traffic signal", "Do not block intersection", "Do not slow down"], correctAnswer: 2 },
  { id: 30, question: "What does this sign mean?", options: ["This lane is reserved for specific types of vehicles during certain times and days such as buses, taxis, bicycles and vehicles with more than three passengers", "No buses allowed on the specified lane during times and days posted", "No stopping during the times and days posted", "Do not enter between the times and days posted"], correctAnswer: 0 },
  { id: 31, question: "What does this sign mean?", options: ["Intersection ahead", "Narrow bridge ahead", "Paved surface ends ahead", "The road ahead is split"], correctAnswer: 3 },
  { id: 32, question: "What does this sign mean?", options: ["Keep to the right of the traffic island", "Road turns right then left", "Winding road ahead", "Pass other traffic on the right"], correctAnswer: 0 },
  { id: 33, question: "What does this sign mean?", options: ["Destination board", "School zone—watch for Children playing", "Provincial park", "Pedestrian control sign"], correctAnswer: 0 },
  { id: 34, question: "What does this sign mean?", options: ["Stop sign ahead", "Yield right-of-way", "Dead end street ahead", "Slow moving vehicle"], correctAnswer: 3 },
  { id: 35, question: "What does this sign mean?", options: ["Going straight is allowed", "No right turn", "No left turn", "Do not drive straight through the intersection"], correctAnswer: 3 },
  { id: 36, question: "What does this sign mean?", options: ["Parking is only for vehicles displaying a valid disabled person parking permit", "No parking", "No standing", "Parking is allowed for a disable person with a permit"], correctAnswer: 0 },
  { id: 37, question: "What does this sign mean?", options: ["No bicycles", "No pedestrians allowed", "No children allowed", "Dogs only"], correctAnswer: 1 },
  { id: 38, question: "What does this sign mean?", options: ["Only for picking up and dropping off passengers if you have a disabled persons permit", "Standing area for disabled persons only", "No parking", "Parking is permitted"], correctAnswer: 0 },
  { id: 39, question: "What does this sign mean?", options: ["School area", "Bumpy road", "Do not stand or stop in this area", "No bicycles allowed on this road"], correctAnswer: 2 },
  { id: 40, question: "What does this sign mean?", options: ["This lane is for buses only", "This lane is for trucks only", "This lane is not for bicycles", "This lane is for bicycles only"], correctAnswer: 3 },
  { id: 41, question: "What does this sign mean?", options: ["Keep to the right lane except when passing (for climbing lanes)", "Keep right if you want to park", "No U-turns", "For right turns"], correctAnswer: 0 },
  { id: 42, question: "What does this sign mean?", options: ["No left turns", "Merging traffic ahead", "Road branching off ahead", "Hidden intersection"], correctAnswer: 1 },
  { id: 43, question: "What does this sign mean?", options: ["No U-turns", "No left turns", "Right turn ahead", "The side-road at the intersection ahead does not have a clear view of traffic"], correctAnswer: 3 },
  { id: 44, question: "A red circle means:", options: ["Do not enter roadway", "Do not enter unless local traffic", "A traffic circle ahead", "Prohibited sign"], correctAnswer: 3 },
  { id: 45, question: "What does this sign mean?", options: ["Merge with traffic, two roads are equally responsible", "Hidden intersection", "No U-turns", "No left turns"], correctAnswer: 0 },
  { id: 46, question: "What does this sign mean?", options: ["Paved surface ends ahead", "Watch for falling rocks", "School zone sign", "Do not block intersection"], correctAnswer: 0 },
  { id: 47, question: "What does this sign mean?", options: ["Bicycles are not allowed", "Bicycle crossing ahead", "No parking", "No left turns"], correctAnswer: 1 },
  { id: 48, question: "What does this sign mean?", options: ["Safety check ahead", "Warns of a steep hill ahead", "Pavement ends, 500 feet ahead", "Bumpy road ahead"], correctAnswer: 1 },
  { id: 49, question: "What does this sign mean?", options: ["Right lane ends", "Hidden intersection ahead", "You are approaching a steep hill", "No parking"], correctAnswer: 0 },
  { id: 50, question: "What does this sign mean?", options: ["Winding road ahead", "Keep to left", "Danger, road ends", "Danger, sharp turn"], correctAnswer: 3 },
  { id: 51, question: "What does this sign mean?", options: ["You are approaching a four-way intersection", "You are approaching a railroad crossing", "You are approaching a hospital zone", "You are approaching a pedestrian crosswalk"], correctAnswer: 0 },
  { id: 52, question: "What does this sign mean?", options: ["Maximum speed of 50 km (30 miles) per hour from this sign to the next sign", "Speed limit for rural school zones", "End of 50 km (30 miles) per hour zone", "Maximum speed of 50 km (30 miles) per hour ahead"], correctAnswer: 3 },
  { id: 53, question: "What does this hand signal mean?", options: ["I am turning left", "I am slowing or stopping", "I am turning right", "You may pass me"], correctAnswer: 1 },
  { id: 54, question: "What does this sign mean?", options: ["Factory ahead, slow down", "Bumpy or uneven pavement ahead", "Construction zone", "Bridge or viaduct"], correctAnswer: 1 },
  { id: 55, question: "What does this hand signal mean?", options: ["I am turning right", "I am turning left", "I am slowing or stopping", "You may pass me"], correctAnswer: 0 },
  { id: 56, question: "What does this sign mean?", options: ["You may exit if you remain in right hand lane", "You must not drive in right hand lane under any circumstances", "End of highway, you must move into right hand lane", "You must exit if you remain in right hand lane"], correctAnswer: 3 },
  { id: 57, question: "What does this sign mean?", options: ["Drive with caution", "Share the road with oncoming traffic", "Slippery when wet", "No standing"], correctAnswer: 1 },
  { id: 58, question: "What does this sign mean?", options: ["No trucks allowed", "Warns of a steep hill ahead", "Passing is not allowed", "Watch for falling rocks"], correctAnswer: 3 },
  { id: 59, question: "What does this sign mean?", options: ["Fire hall", "Do not enter", "There may be water flowing over the road", "Constructions zone"], correctAnswer: 2 },
  { id: 60, question: "What does this sign mean?", options: ["A hidden school bus stop ahead, slow down, drive with extra caution, watch for children and school buses with flashing red lights", "Hidden intersection", "School zone", "School with play ground"], correctAnswer: 0 },
  { id: 61, question: "What does this sign mean?", options: ["Bumpy road ahead", "Sign shows the maximum truck clearance height", "School zone ahead", "Watch for falling rocks"], correctAnswer: 1 },
  { id: 62, question: "What does this sign mean?", options: ["Snowmobile repair shop ahead", "Snowmobile parking", "Snowmobiles cross this road", "Snowmobiles not allowed"], correctAnswer: 2 },
  { id: 63, question: "What does this sign mean?", options: ["Do not pass any vehicles within 30 metres of a pedestrian crossing", "School zone", "Uneven pavement ahead", "Construction zone"], correctAnswer: 0 },
  { id: 64, question: "What does this sign mean?", options: ["Watch for disabled persons", "Passing is not allowed", "Wheel chair crossing", "A school crossing ahead, follow the directions of the crossing guard or school safety patroller"], correctAnswer: 3 },
  { id: 65, question: "What does this sign mean?", options: ["When a school bus arm swings out with red lights flashing, you must stop and you are prohibited from passing", "Construction sign", "School zone", "Stop sign ahead"], correctAnswer: 0 },
  { id: 66, question: "What does this sign mean?", options: ["It is a warning sign", "During school hours when the yellow lights are flashing, follow the speed limit shown", "Watch for cross guard only", "Watch for children only"], correctAnswer: 1 },
  { id: 67, question: "What does this sign mean?", options: ["Highway with two express lanes", "The two lanes ahead are closed", "Two or more passengers must be in the vehicle to use this lane on the highway", "Two lanes will merge into one"], correctAnswer: 2 },
  { id: 68, question: "What does this sign mean?", options: ["Hazard, the downward line indicates the side on which you may safely pass", "Hazard, the downward line indicates the side on which you may not safely pass", "Shopping ahead", "Rest area ahead"], correctAnswer: 0 },
  { id: 69, question: "What does this sign mean?", options: ["Winding road ahead", "By wheel-chair only or disabled person parking (handicap)", "No parking", "No standing"], correctAnswer: 1 },
  { id: 70, question: "What does this sign mean?", options: ["Two separate roads by median ahead, keep to the right", "Divided highway ends", "Narrow bridge ahead", "Road under construction"], correctAnswer: 0 },
  { id: 71, question: "What does this sign mean?", options: ["Lane usage sign permitting all turns including left", "No parking from arrows to corner", "Advance warning of danger", "Lane usage sign meaning right turn only"], correctAnswer: 3 },
  { id: 72, question: "What does this hand signal mean?", options: ["I am turning right", "I am turning left", "I am slowing or stopping", "I am stopping"], correctAnswer: 1 },
  { id: 73, question: "What does this sign mean?", options: ["Keep distance away", "New born baby on broad", "New driver", "New car"], correctAnswer: 2 },
  { id: 74, question: "What does this sign mean?", options: ["Housing", "Hospital", "Horse racing", "Hills"], correctAnswer: 1 },
  { id: 75, question: "What does this sign mean?", options: ["Air show ahead", "Air plane landing", "Route to Airport", "None of the above"], correctAnswer: 2 },
  { id: 76, question: "What does this sign mean?", options: ["No smoking", "Not more than 3 minutes idling", "Idling is permitted", "No stopping more than 3 minutes"], correctAnswer: 1 },
  { id: 77, question: "What does this sign mean?", options: ["The bridge ahead lifts or swings to allow boats to pass", "Airport", "Hotel", "Narrow road ahead"], correctAnswer: 0 },
];

// ── Landing ───────────────────────────────────────────────────────────────────
function Landing({ onSelect, onBack }) {
  const [hov, setHov] = useState(null);
  const cards = [
    { key: "practice", icon: <BookOpen size={26} color={C.primary} />, iconBg: "rgba(26,86,219,0.18)", bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", title: "Practice Mode", desc: "Browse all 77 signs with images. Click the 👁 eye icon to reveal answers when ready.", tag: "77 Signs · Self-paced", tagStyle: { background: "rgba(26,86,219,0.35)", color: "#93c5fd" } },
    { key: "test", icon: <ClipboardList size={26} color={C.white} />, iconBg: "rgba(255,255,255,0.2)", bg: "linear-gradient(135deg,#1a56db 0%,#7c3aed 100%)", border: "none", title: "Test Mode", desc: "Simulate the real G1 exam. 20 random questions — score 16/20 to pass.", tag: "20 Questions · Pass: 16/20", tagStyle: { background: "rgba(255,255,255,0.2)", color: C.white } },
  ];
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(145deg,${C.n900} 0%,#1a3460 50%,${C.n900} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px", fontFamily: font, position: "relative" }}>
      {/* Back to home */}
      <button onClick={onBack} style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 600 }}>
        <ArrowLeft size={15} /> Home
      </button>

      <div style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: C.accent, padding: "5px 18px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 28 }}>🚦 Ontario G1 Prep</div>
      <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 18px" }}>Traffic Signs<br /><span style={{ color: C.accent }}>Study Hub</span></h1>
      <p style={{ color: C.n400, fontSize: "1.05rem", textAlign: "center", margin: "0 0 52px", maxWidth: "460px", lineHeight: 1.75 }}>Master all 77 Ontario traffic signs. Study at your own pace or simulate the real G1 test experience.</p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 720 }}>
        {cards.map(card => (
          <div key={card.key} onClick={() => onSelect(card.key)} onMouseEnter={() => setHov(card.key)} onMouseLeave={() => setHov(null)} style={{ flex: "1 1 290px", maxWidth: 330, background: card.bg, border: card.border, borderRadius: 22, padding: "34px 28px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 14, transform: hov === card.key ? "translateY(-8px)" : "none", boxShadow: hov === card.key ? "0 24px 64px rgba(0,0,0,0.45)" : "0 4px 20px rgba(0,0,0,0.2)", transition: "transform 0.22s ease, box-shadow 0.22s ease" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{card.icon}</div>
            <h2 style={{ color: C.white, fontSize: "1.35rem", fontWeight: 800, margin: 0 }}>{card.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.68)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{card.desc}</p>
            <div style={{ ...card.tagStyle, padding: "6px 14px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 700, alignSelf: "flex-start", marginTop: 4 }}>{card.tag}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 48, marginTop: 60 }}>
        {[["77","Total Signs"],["20","Test Qs"],["80%","Pass Mark"]].map(([n,l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "2.2rem", fontWeight: 900, color: C.white }}>{n}</span>
            <span style={{ display: "block", fontSize: "0.72rem", color: C.n400, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Practice Mode ─────────────────────────────────────────────────────────────
function PracticeMode({ onBack }) {
  const [revealed, setRevealed] = useState({});
  const [expanded, setExpanded] = useState({});
  const [showProgress, setShowProgress] = useState(false);

  const toggleExpand = id => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const toggleReveal = (e, id) => { e.stopPropagation(); setRevealed(p => ({ ...p, [id]: !p[id] })); };
  const count = Object.values(revealed).filter(Boolean).length;
  const pct = Math.round((count / trafficSignsData.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="📖 Practice Mode" onBack={onBack} rightEl={<div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{count}/{trafficSignsData.length} reviewed</div>} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 72px" }}>
        {showProgress && (
          <div style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, borderRadius: 18, padding: "26px 28px", color: C.white, marginBottom: 28 }}>
            <div style={{ fontSize: "0.78rem", opacity: 0.75, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Study Progress</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 12 }}>{pct}% Complete — {count} of {trafficSignsData.length} signs reviewed</div>
            <div style={{ height: 10, borderRadius: 10, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.white, borderRadius: 10, transition: "width 0.6s ease" }} />
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {trafficSignsData.map(q => {
            const open = !!expanded[q.id];
            const shown = !!revealed[q.id];
            return (
              <div key={q.id} style={{ background: C.white, border: `2px solid ${shown ? C.success : C.n200}`, borderRadius: 16, overflow: "hidden", boxShadow: shown ? "0 4px 20px rgba(5,150,105,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "border-color 0.2s" }}>
                <div onClick={() => toggleExpand(q.id)} style={{ display: "flex", alignItems: "center", padding: "14px 18px", cursor: "pointer", gap: 12 }}>
                  <span style={{ background: shown ? C.successBg : C.primaryLight, color: shown ? C.success : C.primary, fontWeight: 700, fontSize: "0.73rem", padding: "3px 9px", borderRadius: 6, flexShrink: 0 }}>Q{q.id}</span>
                  <div style={{ width: 40, height: 40, background: C.n100, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                    <SignImage id={q.id} size={36} />
                  </div>
                  <span style={{ flex: 1, color: C.n700, fontSize: "0.92rem", fontWeight: 500 }}>{q.question}</span>
                  <button onClick={e => toggleReveal(e, q.id)} title={shown ? "Hide answer" : "Reveal answer"} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: shown ? C.successBg : C.n100, color: shown ? C.success : C.n500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {shown ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: C.n100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {open ? <ChevronUp size={15} color={C.n500} /> : <ChevronDown size={15} color={C.n500} />}
                  </div>
                </div>
                {open && (
                  <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.n100}` }}>
                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", marginTop: 16 }}>
                      <div style={{ width: 120, height: 120, background: C.n100, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <SignImage id={q.id} size={110} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: "0 0 14px", color: C.n800, fontWeight: 700, fontSize: "0.95rem" }}>{q.question}</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {q.options.map((opt, i) => {
                            const correct = i === q.correctAnswer;
                            const highlight = shown && correct;
                            return (
                              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 13px", borderRadius: 10, background: highlight ? C.successBg : C.n100, border: `1.5px solid ${highlight ? C.success : "transparent"}` }}>
                                <div style={{ width: 26, height: 26, borderRadius: 6, background: highlight ? C.success : C.n300, color: C.white, fontWeight: 700, fontSize: "0.77rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                                <span style={{ flex: 1, color: highlight ? C.success : C.n700, fontWeight: highlight ? 600 : 400, fontSize: "0.88rem" }}>{opt}</span>
                                {highlight && <CheckCircle size={14} color={C.success} />}
                              </div>
                            );
                          })}
                        </div>
                        {!shown && (
                          <button onClick={e => toggleReveal(e, q.id)} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, background: C.primaryLight, border: "none", color: C.primary, padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>
                            <Eye size={14} /> Reveal Answer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
          <button onClick={() => setShowProgress(true)} style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, color: C.white, border: "none", padding: "14px 38px", borderRadius: "50px", fontSize: "0.97rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 24px rgba(26,86,219,0.35)" }}>
            <Trophy size={18} /> Check My Progress
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Test Mode ─────────────────────────────────────────────────────────────────
function TestMode({ onBack }) {
  const [questions] = useState(() => [...trafficSignsData].sort(() => Math.random() - 0.5).slice(0, 20));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hovOpt, setHovOpt] = useState(null);

  const q = questions[current];
  const totalAnswered = Object.keys(answers).length;
  const score = submitted ? questions.filter(q => answers[q.id] === q.correctAnswer).length : null;
  const passed = score !== null && score >= 16;

  const selectAnswer = (qId, idx) => { if (submitted) return; setAnswers(p => ({ ...p, [qId]: idx })); };
  const getState = (qId, idx) => {
    const sel = answers[qId];
    const correct = questions.find(q => q.id === qId)?.correctAnswer;
    if (!submitted) return sel === idx ? "selected" : "default";
    if (idx === correct) return sel === idx ? "correct" : "missed";
    if (sel === idx) return "wrong";
    return "default";
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
        <PageHeader title="📋 Test Results" onBack={onBack} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 72px" }}>
          <div style={{ background: passed ? `linear-gradient(135deg,${C.success} 0%,#047857 100%)` : `linear-gradient(135deg,${C.danger} 0%,#991b1b 100%)`, borderRadius: 22, padding: "40px 32px", color: C.white, textAlign: "center", marginBottom: 32, boxShadow: passed ? "0 12px 40px rgba(5,150,105,0.35)" : "0 12px 40px rgba(220,38,38,0.35)" }}>
            <div style={{ fontSize: "3rem", marginBottom: 8 }}>{passed ? "🎉" : "📚"}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 4 }}>{passed ? "You Passed!" : "Keep Studying"}</div>
            <div style={{ fontSize: "4.5rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{score}/20</div>
            <div style={{ opacity: 0.8, fontSize: "1rem", marginTop: 10 }}>{passed ? "Outstanding! You've met the passing threshold of 16/20." : `You need ${16 - score} more correct answer${16 - score !== 1 ? "s" : ""} to pass.`}</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
              <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "1.5px solid rgba(255,255,255,0.45)", color: C.white, padding: "10px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>Back</button>
              <button onClick={() => window.location.reload()} style={{ background: C.white, border: "none", color: C.n800, padding: "10px 24px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 6 }}><RotateCcw size={14} /> Try Again</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {questions.map((q, qi) => {
              const correct = answers[q.id] === q.correctAnswer;
              return (
                <div key={q.id} style={{ background: C.white, borderRadius: 16, padding: 20, borderLeft: `4px solid ${correct ? C.success : C.danger}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ background: correct ? C.successBg : C.dangerBg, color: correct ? C.success : C.danger, fontWeight: 700, fontSize: "0.73rem", padding: "3px 9px", borderRadius: 6 }}>Q{qi + 1}</span>
                    {correct ? <CheckCircle size={15} color={C.success} /> : <XCircle size={15} color={C.danger} />}
                    <span style={{ fontSize: "0.8rem", color: correct ? C.success : C.danger, fontWeight: 600 }}>{correct ? "Correct" : "Incorrect"}</span>
                  </div>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ width: 72, height: 72, background: C.n100, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <SignImage id={q.id} size={64} />
                    </div>
                    <p style={{ margin: 0, color: C.n800, fontWeight: 600, fontSize: "0.9rem", flex: 1 }}>{q.question}</p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {q.options.map((opt, i) => {
                      const st = getState(q.id, i); const ss = stateStyles[st];
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", borderRadius: 9, background: ss.bg, border: `1.5px solid ${ss.border}` }}>
                          <div style={{ width: 24, height: 24, borderRadius: 6, background: ss.letterBg, color: ss.letterColor, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                          <span style={{ flex: 1, color: ss.textColor, fontWeight: st !== "default" ? 600 : 400, fontSize: "0.86rem" }}>{opt}</span>
                          {st === "correct" && <CheckCircle size={13} color={C.success} />}
                          {st === "wrong" && <XCircle size={13} color={C.danger} />}
                          {st === "missed" && <span style={{ fontSize: "0.68rem", color: C.success, fontWeight: 700 }}>✓ Correct</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="📋 Test Mode" onBack={onBack} rightEl={<div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{totalAnswered}/20 answered</div>} />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 80px" }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 24 }}>
          {questions.map((_, i) => {
            let bg = C.n200;
            if (answers[questions[i].id] !== undefined) bg = C.primary;
            if (i === current) bg = C.accent;
            return <div key={i} onClick={() => setCurrent(i)} style={{ flex: 1, height: 7, borderRadius: 7, background: bg, cursor: "pointer", transition: "background 0.25s" }} />;
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <button onClick={() => setCurrent(c => c - 1)} disabled={current === 0} style={{ background: current === 0 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: current === 0 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: current === 0 ? "default" : "pointer" }}>← Previous</button>
          <span style={{ color: C.n500, fontSize: "0.87rem", fontWeight: 600 }}>Question {current + 1} of 20 {answers[q.id] !== undefined && <span style={{ color: C.success }}>✓</span>}</span>
          <button onClick={() => setCurrent(c => c + 1)} disabled={current === 19} style={{ background: current === 19 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: current === 19 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: current === 19 ? "default" : "pointer" }}>Next →</button>
        </div>
        <div style={{ background: C.white, borderRadius: 22, padding: 32, boxShadow: "0 6px 30px rgba(0,0,0,0.07)", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ width: 140, height: 140, background: C.n100, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SignImage id={q.id} size={128} />
            </div>
          </div>
          <p style={{ margin: "0 0 22px", fontSize: "1.1rem", fontWeight: 700, color: C.n800, lineHeight: 1.5, textAlign: "center" }}>{q.question}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {q.options.map((opt, i) => {
              const st = answers[q.id] === i ? "selected" : "default"; const ss = stateStyles[st];
              const isHov = hovOpt === `${q.id}-${i}`;
              return (
                <div key={i} onClick={() => selectAnswer(q.id, i)} onMouseEnter={() => setHovOpt(`${q.id}-${i}`)} onMouseLeave={() => setHovOpt(null)} style={{ display: "flex", alignItems: "center", gap: 13, padding: "13px 16px", borderRadius: 12, background: isHov && st === "default" ? C.n200 : ss.bg, border: `2px solid ${isHov && st === "default" ? C.n300 : ss.border}`, cursor: "pointer", transition: "all 0.15s ease" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: ss.letterBg, color: ss.letterColor, fontWeight: 700, fontSize: "0.83rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                  <span style={{ flex: 1, color: ss.textColor, fontWeight: st === "selected" ? 600 : 400, fontSize: "0.93rem" }}>{opt}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {totalAnswered === 20
            ? <button onClick={() => setSubmitted(true)} style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, color: C.white, border: "none", padding: "15px 44px", borderRadius: "50px", fontSize: "1rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 28px rgba(26,86,219,0.38)" }}>Submit Test — See Results</button>
            : <p style={{ color: C.n400, fontSize: "0.85rem" }}>Answer all 20 questions to submit · {20 - totalAnswered} remaining</p>
          }
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function TrafficSigns({ onBack }) {
  const [mode, setMode] = useState("home");
  if (mode === "practice") return <PracticeMode onBack={() => setMode("home")} />;
  if (mode === "test") return <TestMode onBack={() => setMode("home")} />;
  return <Landing onSelect={setMode} onBack={onBack} />;
}