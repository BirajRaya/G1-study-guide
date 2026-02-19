/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect, useRef, useCallback } from "react";
import {
  BookOpen, ClipboardList, RotateCcw, CheckCircle, XCircle, Trophy,
  ArrowLeft, Eye, EyeOff, ChevronDown, ChevronUp, Timer, Layers,
  BarChart2, RefreshCw, ChevronLeft, ChevronRight, Award,
  TrendingUp, AlertCircle, CheckSquare, Clock
} from "lucide-react";

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
  default:  { bg: C.n100,         border: "transparent", textColor: C.n700,    letterBg: C.n300,    letterColor: C.white },
  selected: { bg: C.primaryLight,  border: C.primary,    textColor: C.primary,  letterBg: C.primary, letterColor: C.white },
  correct:  { bg: C.successBg,    border: C.success,     textColor: C.success,  letterBg: C.success, letterColor: C.white },
  wrong:    { bg: C.dangerBg,     border: C.danger,      textColor: C.danger,   letterBg: C.danger,  letterColor: C.white },
  missed:   { bg: C.successBg,    border: C.success,     textColor: C.success,  letterBg: C.success, letterColor: C.white },
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

// ── Attempt Tracker ───────────────────────────────────────────────────────────
const useAttemptTracker = () => {
  const [attempts, setAttempts] = useState({});
  const record = useCallback((qId, isCorrect) => {
    setAttempts(prev => {
      const cur = prev[qId] || { correct: 0, wrong: 0, lastResult: null };
      return { ...prev, [qId]: { correct: cur.correct + (isCorrect ? 1 : 0), wrong: cur.wrong + (isCorrect ? 0 : 1), lastResult: isCorrect ? 'correct' : 'wrong' } };
    });
  }, []);
  const reset = useCallback(() => setAttempts({}), []);
  return { attempts, record, reset };
};

// ── Timer Hook ─────────────────────────────────────────────────────────────────
const useTimer = (initialSeconds, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && timeLeft > 0) { ref.current = setTimeout(() => setTimeLeft(t => t - 1), 1000); }
    else if (running && timeLeft === 0) { setRunning(false); onExpire?.(); }
    return () => clearTimeout(ref.current);
  }, [running, timeLeft]);
  const start = () => setRunning(true);
  const reset = (secs) => { setRunning(false); setTimeLeft(secs ?? initialSeconds); };
  return { timeLeft, running, start, reset };
};

const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
const TIMED_TEST_SECONDS = 20 * 60;

// ── Landing ───────────────────────────────────────────────────────────────────
function Landing({ onSelect, onBack, attempts }) {
  const [hov, setHov] = useState(null);
  const totalAttempted = Object.keys(attempts).length;
  const totalCorrect = Object.values(attempts).filter(a => a.lastResult === 'correct').length;

  const cards = [
    { key: "practice", icon: <BookOpen size={26} color={C.primary} />, iconBg: "rgba(26,86,219,0.18)", bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", title: "Practice Mode", desc: "Browse all 77 signs with images. Click the 👁 eye icon to reveal answers when ready.", tag: "77 Signs · Self-paced", tagStyle: { background: "rgba(26,86,219,0.35)", color: "#93c5fd" } },
    { key: "test", icon: <ClipboardList size={26} color={C.white} />, iconBg: "rgba(255,255,255,0.2)", bg: "linear-gradient(135deg,#1a56db 0%,#7c3aed 100%)", border: "none", title: "Test Mode", desc: "Simulate the real G1 exam. 20 random questions — score 16/20 to pass.", tag: "20 Questions · Pass: 16/20", tagStyle: { background: "rgba(255,255,255,0.2)", color: C.white } },
    { key: "timed", icon: <Timer size={26} color="#f59e0b" />, iconBg: "rgba(245,158,11,0.2)", bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(245,158,11,0.25)", title: "Timed Test", desc: "20 minutes, 20 sign questions. Race the clock to simulate exam pressure.", tag: "20 min · Pressure Mode", tagStyle: { background: "rgba(245,158,11,0.2)", color: "#fcd34d" } },
    { key: "flashcard", icon: <Layers size={26} color="#10b981" />, iconBg: "rgba(16,185,129,0.2)", bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(16,185,129,0.25)", title: "Flashcard Mode", desc: "Flip cards to test your sign recognition — great for quick visual review.", tag: "77 Cards · Flip to reveal", tagStyle: { background: "rgba(16,185,129,0.2)", color: "#6ee7b7" } },
    { key: "progress", icon: <BarChart2 size={26} color="#a78bfa" />, iconBg: "rgba(167,139,250,0.2)", bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(167,139,250,0.25)", title: "Progress Report", desc: "See your attempt history, weak spots, and overall mastery across all signs.", tag: `${totalAttempted} Tracked · ${totalCorrect} Correct`, tagStyle: { background: "rgba(167,139,250,0.2)", color: "#c4b5fd" } },
  ];

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(145deg,${C.n900} 0%,#1a3460 50%,${C.n900} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px", fontFamily: font, position: "relative" }}>
      <button onClick={onBack} style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 600 }}>
        <ArrowLeft size={15} /> Home
      </button>
      <div style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: C.accent, padding: "5px 18px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 28 }}>🚦 Ontario G1 Prep</div>
      <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 18px" }}>Traffic Signs<br /><span style={{ color: C.accent }}>Study Hub</span></h1>
      <p style={{ color: C.n400, fontSize: "1.05rem", textAlign: "center", margin: "0 0 44px", maxWidth: "460px", lineHeight: 1.75 }}>Master all 77 Ontario traffic signs with 5 study modes designed for the G1 exam.</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 900 }}>
        {cards.map(card => (
          <div key={card.key} onClick={() => onSelect(card.key)} onMouseEnter={() => setHov(card.key)} onMouseLeave={() => setHov(null)}
            style={{ flex: "1 1 260px", maxWidth: 290, background: card.bg, border: card.border, borderRadius: 22, padding: "28px 24px", cursor: "pointer", display: "flex", flexDirection: "column", gap: 12, transform: hov === card.key ? "translateY(-6px)" : "none", boxShadow: hov === card.key ? "0 20px 56px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.2)", transition: "transform 0.22s ease, box-shadow 0.22s ease" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{card.icon}</div>
            <h2 style={{ color: C.white, fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>{card.title}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.84rem", lineHeight: 1.65, margin: 0, flex: 1 }}>{card.desc}</p>
            <div style={{ ...card.tagStyle, padding: "5px 12px", borderRadius: 7, fontSize: "0.75rem", fontWeight: 700, alignSelf: "flex-start", marginTop: 4 }}>{card.tag}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 48, marginTop: 52 }}>
        {[["77", "Total Signs"], ["20", "Test Qs"], ["80%", "Pass Mark"], [totalAttempted > 0 ? `${Math.round((totalCorrect / totalAttempted) * 100)}%` : "—", "Accuracy"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "2rem", fontWeight: 900, color: C.white }}>{n}</span>
            <span style={{ display: "block", fontSize: "0.68rem", color: C.n400, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{l}</span>
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
            const open = !!expanded[q.id]; const shown = !!revealed[q.id];
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
                            const correct = i === q.correctAnswer; const highlight = shown && correct;
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
          <button onClick={() => setShowProgress(p => !p)} style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, color: C.white, border: "none", padding: "14px 38px", borderRadius: "50px", fontSize: "0.97rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 24px rgba(26,86,219,0.35)" }}>
            <Trophy size={18} /> {showProgress ? "Hide Progress" : "Check My Progress"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared Test Engine ────────────────────────────────────────────────────────
function TestEngine({ onBack, timed, record }) {
  const [questions] = useState(() => [...trafficSignsData].sort(() => Math.random() - 0.5).slice(0, 20));
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [hovOpt, setHovOpt] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);

  const handleExpire = useCallback(() => { if (!submitted) submitTest(); }, [submitted, answers]);
  const { timeLeft, start } = useTimer(TIMED_TEST_SECONDS, handleExpire);

  useEffect(() => { if (timed && !submitted) start(); }, [timed]);

  const q = questions[current];
  const totalAnswered = Object.keys(answers).length;
  const score = submitted ? questions.filter(q => answers[q.id] === q.correctAnswer).length : null;
  const passed = score !== null && score >= 16;
  const timerColor = timeLeft < 120 ? C.danger : timeLeft < 300 ? C.accent : C.success;

  const selectAnswer = (qId, idx) => { if (submitted) return; setAnswers(p => ({ ...p, [qId]: idx })); };
  const getState = (qId, idx) => {
    const sel = answers[qId]; const correct = questions.find(q => q.id === qId)?.correctAnswer;
    if (!submitted) return sel === idx ? "selected" : "default";
    if (idx === correct) return sel === idx ? "correct" : "missed";
    if (sel === idx) return "wrong";
    return "default";
  };

  const submitTest = () => {
    setTimeTaken(timed ? TIMED_TEST_SECONDS - timeLeft : 0);
    questions.forEach(q => { if (answers[q.id] !== undefined) record(q.id, answers[q.id] === q.correctAnswer); });
    setSubmitted(true);
  };

  if (submitted) {
    const unanswered = 20 - totalAnswered;
    return (
      <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
        <PageHeader title={`📋 ${timed ? "Timed Test" : "Test"} Results`} onBack={onBack} />
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 20px 72px" }}>
          <div style={{ background: passed ? `linear-gradient(135deg,${C.success} 0%,#047857 100%)` : `linear-gradient(135deg,${C.danger} 0%,#991b1b 100%)`, borderRadius: 22, padding: "40px 32px", color: C.white, textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: "3rem", marginBottom: 8 }}>{passed ? "🎉" : "📚"}</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 4 }}>{passed ? "You Passed!" : "Keep Studying"}</div>
            <div style={{ fontSize: "4.5rem", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>{score}/20</div>
            {timed && timeTaken > 0 && <div style={{ opacity: 0.8, fontSize: "0.9rem", marginTop: 8 }}>⏱ Time used: {formatTime(timeTaken)}</div>}
            {unanswered > 0 && <div style={{ opacity: 0.7, fontSize: "0.85rem", marginTop: 4 }}>({unanswered} question{unanswered !== 1 ? "s" : ""} unanswered)</div>}
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
                <div key={q.id} style={{ background: C.white, borderRadius: 16, padding: 20, borderLeft: `4px solid ${correct ? C.success : answers[q.id] === undefined ? C.n300 : C.danger}`, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ background: correct ? C.successBg : answers[q.id] === undefined ? C.n100 : C.dangerBg, color: correct ? C.success : answers[q.id] === undefined ? C.n400 : C.danger, fontWeight: 700, fontSize: "0.73rem", padding: "3px 9px", borderRadius: 6 }}>Q{qi + 1}</span>
                    {answers[q.id] === undefined ? <AlertCircle size={15} color={C.n400} /> : correct ? <CheckCircle size={15} color={C.success} /> : <XCircle size={15} color={C.danger} />}
                    <span style={{ fontSize: "0.8rem", color: correct ? C.success : answers[q.id] === undefined ? C.n400 : C.danger, fontWeight: 600 }}>{answers[q.id] === undefined ? "Unanswered" : correct ? "Correct" : "Incorrect"}</span>
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
      <PageHeader
        title={`📋 ${timed ? "⏱ Timed " : ""}Test Mode`}
        onBack={onBack}
        rightEl={
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {timed && (
              <div style={{ background: timeLeft < 120 ? C.dangerBg : timeLeft < 300 ? "rgba(245,158,11,0.1)" : C.successBg, color: timerColor, fontWeight: 800, fontSize: "1rem", padding: "5px 14px", borderRadius: "50px", border: `1.5px solid ${timerColor}`, display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={14} /> {formatTime(timeLeft)}
              </div>
            )}
            <div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{totalAnswered}/20 answered</div>
          </div>
        }
      />
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
            ? <button onClick={submitTest} style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, color: C.white, border: "none", padding: "15px 44px", borderRadius: "50px", fontSize: "1rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 28px rgba(26,86,219,0.38)" }}>Submit Test — See Results</button>
            : <div>
                <p style={{ color: C.n400, fontSize: "0.85rem", margin: "0 0 12px" }}>Answer all 20 questions to submit · {20 - totalAnswered} remaining</p>
                {timed && <button onClick={submitTest} style={{ background: C.n100, border: `1px solid ${C.n200}`, color: C.n500, padding: "10px 24px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>Submit anyway ({totalAnswered}/20 answered)</button>}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

// ── Flashcard Mode ─────────────────────────────────────────────────────────────
function FlashcardMode({ onBack, record }) {
  const [deck] = useState(() => [...trafficSignsData].sort(() => Math.random() - 0.5));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [answered, setAnswered] = useState({});
  const [filter, setFilter] = useState("all");
  const [animDir, setAnimDir] = useState(null);

  const filtered = deck.filter(q => {
    if (filter === "wrong") return answered[q.id] === "wrong";
    if (filter === "unanswered") return !answered[q.id];
    return true;
  });
  const total = filtered.length;
  const card = filtered[Math.min(index, total - 1)];
  const correctCount = Object.values(answered).filter(v => v === "correct").length;
  const wrongCount = Object.values(answered).filter(v => v === "wrong").length;

  const navigate = (dir) => {
    setAnimDir(dir);
    setTimeout(() => {
      setFlipped(false);
      setIndex(i => dir === "next" ? Math.min(i + 1, total - 1) : Math.max(i - 1, 0));
      setAnimDir(null);
    }, 180);
  };

  const handleAnswer = (correct) => {
    const q = filtered[index];
    setAnswered(p => ({ ...p, [q.id]: correct ? "correct" : "wrong" }));
    record(q.id, correct);
    if (index < total - 1) navigate("next");
    else setFlipped(false);
  };

  if (!card) return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="🃏 Flashcard Mode" onBack={onBack} />
      <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 20px", textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>✅</div>
        <h2 style={{ color: C.n800, fontWeight: 800 }}>No cards in this filter!</h2>
        <button onClick={() => { setFilter("all"); setIndex(0); }} style={{ marginTop: 20, background: C.primary, color: C.white, border: "none", padding: "12px 28px", borderRadius: 12, fontWeight: 700, cursor: "pointer" }}>Show All Cards</button>
      </div>
    </div>
  );

  const progress = total > 0 ? ((index + 1) / total) * 100 : 0;

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader
        title="🃏 Flashcard Mode"
        onBack={onBack}
        rightEl={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.78rem", padding: "4px 11px", borderRadius: "50px" }}>✓ {correctCount}</div>
            <div style={{ background: C.dangerBg, color: C.danger, fontWeight: 700, fontSize: "0.78rem", padding: "4px 11px", borderRadius: "50px" }}>✗ {wrongCount}</div>
          </div>
        }
      />
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 80px" }}>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, background: C.white, padding: 6, borderRadius: 12, border: `1px solid ${C.n200}` }}>
          {[["all", "All Cards", trafficSignsData.length], ["unanswered", "Unanswered", trafficSignsData.length - Object.keys(answered).length], ["wrong", "Need Review", wrongCount]].map(([key, label, count]) => (
            <button key={key} onClick={() => { setFilter(key); setIndex(0); setFlipped(false); }} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", background: filter === key ? C.primary : "transparent", color: filter === key ? C.white : C.n500, fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", transition: "all 0.15s" }}>
              {label} <span style={{ opacity: 0.7 }}>({count})</span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: C.n200, borderRadius: 6, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg,${C.primary},#7c3aed)`, borderRadius: 6, transition: "width 0.3s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ color: C.n500, fontSize: "0.82rem", fontWeight: 600 }}>Card {Math.min(index + 1, total)} of {total}</span>
          <span style={{ color: C.n400, fontSize: "0.82rem" }}>Click card to flip</span>
        </div>

        {/* Card */}
        <div
          onClick={() => setFlipped(f => !f)}
          style={{
            minHeight: 320, borderRadius: 24, padding: "36px 32px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.1)", cursor: "pointer",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            textAlign: "center", gap: 18, marginBottom: 24,
            border: `2px solid ${flipped ? C.success : C.n200}`,
            opacity: animDir ? 0 : 1,
            transform: animDir === "next" ? "translateX(-20px)" : animDir === "prev" ? "translateX(20px)" : "translateX(0)",
            transition: "opacity 0.18s, transform 0.18s, border-color 0.2s",
            background: flipped ? `linear-gradient(135deg,${C.successBg} 0%,#d1fae5 100%)` : C.white,
          }}
        >
          {!flipped ? (
            <>
              <div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.72rem", padding: "4px 12px", borderRadius: 6 }}>SIGN #{card.id} — IDENTIFY</div>
              {/* Sign image front */}
              <div style={{ width: 150, height: 150, background: C.n100, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SignImage id={card.id} size={130} />
              </div>
              <p style={{ fontSize: "1.05rem", fontWeight: 700, color: C.n800, margin: 0, maxWidth: 420 }}>{card.question}</p>
              {/* Options preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: 7, width: "100%", maxWidth: 400 }}>
                {card.options.map((opt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 13px", borderRadius: 10, background: C.n100, textAlign: "left" }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: C.n300, color: C.white, fontWeight: 700, fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                    <span style={{ color: C.n700, fontSize: "0.86rem" }}>{opt}</span>
                  </div>
                ))}
              </div>
              <div style={{ color: C.n400, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 5 }}>
                <RefreshCw size={13} /> Tap to reveal answer
              </div>
            </>
          ) : (
            <>
              <div style={{ background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.72rem", padding: "4px 12px", borderRadius: 6 }}>✓ ANSWER</div>
              <div style={{ width: 80, height: 80, background: C.n100, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SignImage id={card.id} size={70} />
              </div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: C.success, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={28} color={C.white} />
              </div>
              <p style={{ fontSize: "1.15rem", fontWeight: 800, color: C.success, margin: 0, maxWidth: 440 }}>{card.options[card.correctAnswer]}</p>
              <p style={{ fontSize: "0.85rem", color: C.n600, margin: 0 }}>
                Option <strong>{LETTERS[card.correctAnswer]}</strong>
              </p>
            </>
          )}
        </div>

        {/* Answer buttons */}
        {flipped && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <button onClick={() => handleAnswer(false)} style={{ flex: 1, padding: "14px", borderRadius: 14, border: `2px solid ${C.danger}`, background: C.dangerBg, color: C.danger, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <XCircle size={18} /> Got it Wrong
            </button>
            <button onClick={() => handleAnswer(true)} style={{ flex: 1, padding: "14px", borderRadius: 14, border: `2px solid ${C.success}`, background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <CheckCircle size={18} /> Got it Right!
            </button>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
          <button onClick={() => navigate("prev")} disabled={index === 0} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${C.n200}`, background: index === 0 ? C.n100 : C.white, color: index === 0 ? C.n300 : C.n700, cursor: index === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => { setIndex(0); setFlipped(false); }} style={{ padding: "10px 20px", borderRadius: 10, border: `1px solid ${C.n200}`, background: C.white, color: C.n600, fontWeight: 600, fontSize: "0.84rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <RefreshCw size={14} /> Restart
          </button>
          <button onClick={() => navigate("next")} disabled={index >= total - 1} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${C.n200}`, background: index >= total - 1 ? C.n100 : C.white, color: index >= total - 1 ? C.n300 : C.n700, cursor: index >= total - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Progress Report ───────────────────────────────────────────────────────────
function ProgressReport({ onBack, attempts, onReset }) {
  const [filter, setFilter] = useState("all");

  const total = trafficSignsData.length;
  const attempted = Object.keys(attempts).length;
  const correct = Object.values(attempts).filter(a => a.lastResult === "correct").length;
  const wrong = Object.values(attempts).filter(a => a.lastResult === "wrong").length;
  const unattempted = total - attempted;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const weakSpots = trafficSignsData
    .filter(q => attempts[q.id] && attempts[q.id].wrong > 0)
    .sort((a, b) => (attempts[b.id]?.wrong || 0) - (attempts[a.id]?.wrong || 0))
    .slice(0, 5);

  const filteredQs = trafficSignsData.filter(q => {
    if (filter === "correct") return attempts[q.id]?.lastResult === "correct";
    if (filter === "wrong") return attempts[q.id]?.lastResult === "wrong";
    if (filter === "unattempted") return !attempts[q.id];
    return true;
  });

  const masteryColor = accuracy >= 80 ? C.success : accuracy >= 60 ? C.accent : C.danger;

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader
        title="📊 Progress Report"
        onBack={onBack}
        rightEl={
          <button onClick={onReset} style={{ display: "flex", alignItems: "center", gap: 6, background: C.dangerBg, border: `1px solid ${C.danger}`, color: C.danger, padding: "6px 14px", borderRadius: 8, fontWeight: 600, fontSize: "0.8rem", cursor: "pointer" }}>
            <RotateCcw size={13} /> Reset Data
          </button>
        }
      />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 72px" }}>

        {/* Hero stats */}
        <div style={{ background: `linear-gradient(135deg,${C.n900} 0%,#1a3460 100%)`, borderRadius: 22, padding: "32px 28px", color: C.white, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 70, height: 70, borderRadius: 18, background: masteryColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award size={36} color={C.white} />
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Overall Accuracy</div>
              <div style={{ fontSize: "3rem", fontWeight: 900, lineHeight: 1, color: masteryColor }}>{accuracy}%</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: 2 }}>{attempted} of {total} signs attempted</div>
            </div>
          </div>
          <div style={{ marginBottom: 8, fontSize: "0.75rem", opacity: 0.65, display: "flex", justifyContent: "space-between" }}>
            <span>Progress to mastery (80%)</span><span>{accuracy}%</span>
          </div>
          <div style={{ height: 10, borderRadius: 10, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${accuracy}%`, background: masteryColor, borderRadius: 10, transition: "width 0.8s ease" }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {[{ label: "Correct", value: correct, color: "#34d399", bg: "rgba(52,211,153,0.15)" }, { label: "Wrong", value: wrong, color: "#f87171", bg: "rgba(248,113,113,0.15)" }, { label: "Unattempted", value: unattempted, color: "#94a3b8", bg: "rgba(148,163,184,0.15)" }, { label: "Total Signs", value: total, color: "#c4b5fd", bg: "rgba(196,181,253,0.15)" }].map(s => (
              <div key={s.label} style={{ flex: "1 1 80px", background: s.bg, borderRadius: 12, padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak spots */}
        {weakSpots.length > 0 && (
          <div style={{ background: C.white, borderRadius: 18, padding: "22px 22px", marginBottom: 24, border: `1px solid ${C.dangerBg}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <TrendingUp size={18} color={C.danger} />
              <h3 style={{ margin: 0, color: C.n800, fontWeight: 800, fontSize: "1rem" }}>Weak Spots — Focus Here</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {weakSpots.map(q => {
                const a = attempts[q.id];
                const total_a = a.correct + a.wrong;
                const pct = Math.round((a.wrong / total_a) * 100);
                return (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: C.dangerBg, borderRadius: 10 }}>
                    <div style={{ width: 44, height: 44, background: C.n100, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <SignImage id={q.id} size={38} />
                    </div>
                    <span style={{ background: C.danger, color: C.white, fontWeight: 700, fontSize: "0.7rem", padding: "3px 8px", borderRadius: 5, flexShrink: 0 }}>Q{q.id}</span>
                    <span style={{ flex: 1, color: C.n700, fontSize: "0.87rem", lineHeight: 1.4 }}>{q.options[q.correctAnswer]}</span>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "1rem", fontWeight: 800, color: C.danger }}>{pct}%</div>
                      <div style={{ fontSize: "0.68rem", color: C.n400 }}>error rate</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter + question list */}
        <div style={{ background: C.white, borderRadius: 18, padding: "20px 20px", border: `1px solid ${C.n200}` }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18, background: C.n50, padding: 5, borderRadius: 10 }}>
            {[["all", "All", total], ["correct", "✓ Correct", correct], ["wrong", "✗ Wrong", wrong], ["unattempted", "Not Tried", unattempted]].map(([key, label, count]) => (
              <button key={key} onClick={() => setFilter(key)} style={{ flex: 1, padding: "7px 8px", borderRadius: 7, border: "none", background: filter === key ? C.primary : "transparent", color: filter === key ? C.white : C.n500, fontWeight: 700, fontSize: "0.75rem", cursor: "pointer", transition: "all 0.15s" }}>
                {label} ({count})
              </button>
            ))}
          </div>
          {filteredQs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: C.n400 }}>
              <CheckSquare size={32} style={{ marginBottom: 12 }} />
              <p style={{ fontWeight: 600 }}>No signs in this category yet</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredQs.map(q => {
                const a = attempts[q.id];
                const status = !a ? "unattempted" : a.lastResult;
                const statusColor = status === "correct" ? C.success : status === "wrong" ? C.danger : C.n400;
                const statusBg = status === "correct" ? C.successBg : status === "wrong" ? C.dangerBg : C.n100;
                return (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", background: statusBg, borderRadius: 10, border: `1px solid ${status === "correct" ? "rgba(5,150,105,0.15)" : status === "wrong" ? "rgba(220,38,38,0.15)" : C.n200}` }}>
                    <div style={{ width: 38, height: 38, background: C.white, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${C.n200}` }}>
                      <SignImage id={q.id} size={32} />
                    </div>
                    <span style={{ background: statusColor, color: C.white, fontWeight: 700, fontSize: "0.7rem", padding: "3px 8px", borderRadius: 5, flexShrink: 0 }}>Q{q.id}</span>
                    <span style={{ flex: 1, color: C.n700, fontSize: "0.86rem", lineHeight: 1.4 }}>{q.options[q.correctAnswer]}</span>
                    {a && (
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        {a.correct > 0 && <span style={{ background: C.successBg, color: C.success, fontWeight: 700, fontSize: "0.68rem", padding: "2px 7px", borderRadius: 5 }}>✓{a.correct}</span>}
                        {a.wrong > 0 && <span style={{ background: C.dangerBg, color: C.danger, fontWeight: 700, fontSize: "0.68rem", padding: "2px 7px", borderRadius: 5 }}>✗{a.wrong}</span>}
                      </div>
                    )}
                    {!a && <span style={{ color: C.n400, fontSize: "0.72rem" }}>—</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function TrafficSigns({ onBack }) {
  const [mode, setMode] = useState("home");
  const { attempts, record, reset } = useAttemptTracker();

  if (mode === "practice") return <PracticeMode onBack={() => setMode("home")} />;
  if (mode === "test") return <TestEngine onBack={() => setMode("home")} timed={false} record={record} />;
  if (mode === "timed") return <TestEngine onBack={() => setMode("home")} timed={true} record={record} />;
  if (mode === "flashcard") return <FlashcardMode onBack={() => setMode("home")} record={record} />;
  if (mode === "progress") return <ProgressReport onBack={() => setMode("home")} attempts={attempts} onReset={reset} />;
  return <Landing onSelect={setMode} onBack={onBack} attempts={attempts} />;
}