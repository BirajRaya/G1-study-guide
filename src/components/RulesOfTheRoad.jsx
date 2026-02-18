import { useState } from "react";
import { BookOpen, ClipboardList, RotateCcw, CheckCircle, XCircle, Trophy, ArrowLeft, Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { C, font, LETTERS, PageHeader, stateStyles } from "./TrafficSigns";

const rulesData = [
  { id: 1, question: "In Ontario, there is a seat belt law", options: ["Yes", "No", "Only when driving on an open highway", "Only when driving within a municipality"], correctAnswer: 0 },
  { id: 2, question: "If someone is tailgating you, what should you do?", options: ["Move into another lane when it is safe to do so", "Slow down slightly to increase the space in front of your car", "Pull over to let the tailgater pass", "All of the above"], correctAnswer: 3 },
  { id: 3, question: "Failing to stop for a school bus that is unloading passengers will", options: ["Result in a one year jail sentence", "Cost you 6 demerit points and a fine of up to $1000", "Get you a warning and a fine of $100", "Result in retaking your road test"], correctAnswer: 1 },
  { id: 4, question: "When a car is stopped to allow a pedestrian to cross the street at a marked crosswalk, you should", options: ["Pass the stopped car on the left", "Sound horn for the driver of the stopped car to drive on", "Pass the stopped car to the right", "Not pass any car stopped to allow a pedestrian to cross"], correctAnswer: 3 },
  { id: 5, question: "When driving in heavy fog, you should use", options: ["Parking lights", "Low beam headlights", "Parking lights and high beam headlights", "High beam headlights"], correctAnswer: 1 },
  { id: 6, question: "Never change lanes in traffic without", options: ["Giving proper signal and looking to make sure the move can be made safely", "Decreasing speed and giving the correct signal", "Looking into the rear view mirror only", "Blowing your horn and looking to the rear"], correctAnswer: 0 },
  { id: 7, question: "What documents may a police officer require a motor vehicle owner to produce?", options: ["If the motor vehicle is insured—a liability insurance card", "The motor vehicle ownership", "If he is operating a motor vehicle—a valid driver's licence", "Any of the above"], correctAnswer: 3 },
  { id: 8, question: "Every accident must be reported to the police where there is personal injury or when the damage exceeds", options: ["$100", "$150", "$1500", "$1000"], correctAnswer: 3 },
  { id: 9, question: "When lights are required, drivers must use lower beam headlights when following another vehicle", options: ["Within 30 m (100 ft.)", "Within 60 m (200 ft.)", "Within 120 m (400 ft.)", "This only applies when approaching another vehicle"], correctAnswer: 1 },
  { id: 10, question: "While travelling on a highway, the driver of a motor vehicle is not permitted to carry, in a house or boat trailer", options: ["Firearms", "Flammable material", "Persons (Passenger)", "Pets"], correctAnswer: 2 },
  { id: 11, question: "When on streets designed for two-way traffic, you hear the siren of an emergency vehicle, what does the law require you to do?", options: ["Speed up and get out of the way", "Signal the driver to pass", "Pull to the right as far as possible and stop", "Continue at the same speed"], correctAnswer: 2 },
  { id: 12, question: "Which of the following has the right-of-way over all others at an intersection when the signal light is green?", options: ["Pedestrians crossing against the light", "Pedestrians crossing with the light", "Vehicles turning right", "Vehicles turning left"], correctAnswer: 1 },
  { id: 13, question: "To what penalties is a driver liable who is convicted of driving while disqualified?", options: ["A fine of $500 or imprisonment for six months or both", "Impoundment of the motor vehicle being operated for three months", "An additional 6-month period of suspension of driving privilege", "Any or all of the above"], correctAnswer: 3 },
  { id: 14, question: "When the traffic signal-light facing you is red and you intend to go straight through the intersection, what must you do?", options: ["Stop, give pedestrians the right-of-way, then proceed with caution", "Stop, proceed when the way is clear", "Slow down, proceed when the way is clear", "Stop, proceed only when the signal turns green and when the way is clear"], correctAnswer: 3 },
  { id: 15, question: "If you are involved in a reportable accident how soon must you make a report to your nearest provincial or municipal police officer?", options: ["At once", "Within 24 hours", "Within 48 hours", "Within 72 hours"], correctAnswer: 0 },
  { id: 16, question: "If a traffic signal changes while a pedestrian is still in the street, which of the following has the right-of-way?", options: ["Motorists making turns", "The pedestrian", "Motorists coming from his right", "Motorists coming from his left"], correctAnswer: 1 },
  { id: 17, question: "Unless otherwise posted, the maximum speed limit allowed in cities, town, villages and built-up area is", options: ["30 km/h (20 m.p.h.)", "50 km/h (30 m.p.h.)", "40 km/h (25 m.p.h.)", "60 km/h (35 m.p.h.)"], correctAnswer: 1 },
  { id: 18, question: "At an intersection where there is a flashing amber (yellow) traffic light, you must", options: ["Stop if making a right turn", "Continue at the same speed", "Stop if making a left turn", "Slow down and proceed with caution"], correctAnswer: 3 },
  { id: 19, question: "Under what circumstances may a driver's licence be cancelled?", options: ["For failure to attend a re-examination", "For possession of an altered driver's licence", "For failure to satisfactorily complete a driver re-examination", "Any or all of the above"], correctAnswer: 3 },
  { id: 20, question: "As a level one (G1) driver, you must be accompanied by a class G or higher licensed driver, who has the following driving experience more than", options: ["Three years", "Four years", "Eight years", "Six years"], correctAnswer: 1 },
  { id: 21, question: "As a level two (G2) driver your alcohol level must not be over", options: ["0.08%", "0.05%", "0.02%", "0.00%"], correctAnswer: 3 },
  { id: 22, question: "Overdriving your headlights at night is dangerous because", options: ["You are driving too fast", "Your headlights are too bright", "You cannot stop within the distance that you can see", "It is not good for the car battery"], correctAnswer: 2 },
  { id: 23, question: "If you want to pass a motorcycle, you should", options: ["Honk your horn before you pass", "Turn on your high-beam lights before you pass", "Pass just as you would with another car", "Use half of their lane to pass"], correctAnswer: 2 },
  { id: 24, question: "If you are a teenage driver aged 19 or under and in the first six months of receiving your G2 licence. How many passengers are you allowed to carry between midnight and 5 a.m.?", options: ["3 passengers aged 19 or under", "No passengers aged 19 or under", "1 passenger aged 19 or under", "2 passengers aged 19 or under"], correctAnswer: 1 },
  { id: 25, question: "If you are a teenage driver with your G2 licence for 6 months and until you obtain your full G licence or turn 20, how many passengers are you allowed to carry between midnight and 5 a.m.?", options: ["3 passengers aged 19 or under (no restrictions for passengers the age of 20 and over)", "No passengers aged 19 or under", "1 passenger aged 19 or under", "2 passengers aged 19 or under"], correctAnswer: 0 },
  { id: 26, question: "A 'No Parking' sign at a certain location means", options: ["You may stop here if the driver remains in the vehicle", "You may park your vehicle for less than five minutes", "You may stop temporarily to load or unload passengers", "You may not park your vehicle here"], correctAnswer: 3 },
  { id: 27, question: "In what position on the roadway must you be before making a left turn from a one-way traffic street?", options: ["Close to the right-hand side of the roadway", "Close to the centre line of the roadway", "Close to the left side of the roadway", "Does not matter"], correctAnswer: 2 },
  { id: 28, question: "When lights are required, drivers are required to use low beam headlights?", options: ["Within 1 km (0.6 mile) of the approach of another vehicle", "Within 150 m (500 ft.) of the approach of another vehicle", "Within 300 m (1000 ft.) of the approach of another vehicle", "This is a safety practice, not a law"], correctAnswer: 1 },
  { id: 29, question: "What insurance protection does the owner get who pays the uninsured motor vehicle fee?", options: ["$10,000 insurance coverage", "$20,000 insurance coverage", "$35,000 insurance coverage", "No insurance protection whatever"], correctAnswer: 3 },
  { id: 30, question: "When approaching a railway crossing at which an electrical or mechanical signal device is warning of the approach of a train you must", options: ["Stop not less than 1.5 m (5 ft.) from the nearest rail", "Increase speed and cross tracks as quickly as possible", "Stop not less than 5 m (15 ft.) from the nearest rail", "Slow down and proceed with caution"], correctAnswer: 2 },
  { id: 31, question: "Upon approaching a Yield-sign, what does the law require you to do?", options: ["Slow down, stop if necessary, and yield right-of-way", "Stop, then enter traffic slowly", "Stop, then enter traffic quickly", "Speed up and force your way into traffic"], correctAnswer: 0 },
  { id: 32, question: "When does the law require lights on vehicles to be turned on?", options: ["Between sunset and sunrise", "Between dusk and dawn and at any other time you cannot see clearly for a distance of 150 m (500 ft.)", "Between half an hour before sunset to half an hour after sunrise and at any other time you cannot see clearly for a distance of 150 m (500 ft.)", "No specified time"], correctAnswer: 2 },
  { id: 33, question: "A person whose driver's licence is under suspension, may", options: ["Operate a motor vehicle in a case of extreme emergency", "Operate a motor vehicle to and from work", "Operate a motor vehicle when accompanied by a licensed driver", "Not operate a motor vehicle under any conditions"], correctAnswer: 3 },
  { id: 34, question: "If the signal light changes from green to amber as you approach an intersection, what should you do?", options: ["Stop. If a stop cannot be made safely proceed with caution", "Speed up to clear the intersection as quickly as possible", "Continue through the intersection without slowing or stopping", "Sound horn to warn pedestrians and other drivers that you do not intend to stop"], correctAnswer: 0 },
  { id: 35, question: "When a streetcar is stopped to take on or discharge passengers, where there is no safety zone, what does the law require you to do before passing the streetcar?", options: ["Stop behind the rear of the streetcar and then proceed", "Sound horn and pass with caution", "Pass on the left side when the way is clear", "Stop 2 m (6 ft.) behind the rearmost door where passengers are getting on or off, and proceed only when it is safe to do so"], correctAnswer: 3 },
  { id: 36, question: "On a roadway where traffic is moving in both directions, in what position must you be before making a left turn?", options: ["Close to the right-hand side of the roadway", "Close to the left side of the roadway", "Immediately to the right of the centre line of the roadway", "Does not matter"], correctAnswer: 2 },
  { id: 37, question: "Upon approaching a stop sign, a driver must", options: ["Slow down, sound horn and then proceed", "Slow down, and if the way is clear, proceed", "Stop, sound horn, then proceed", "Stop, and when it is safe to do so, proceed"], correctAnswer: 3 },
  { id: 38, question: "You should under all condition drive at a speed which will allow you to", options: ["Stop within 90 metres (300 feet)", "Stop within 60 metres (200 feet)", "Stop within a safe distance", "Stop within 150 metres (500 feet)"], correctAnswer: 2 },
  { id: 39, question: "The Ministry of Transportation may suspend a licence after a 9 Demerit Point interview", options: ["If a driver fails to give satisfactory reasons why their licence should not be suspended", "If a driver does not have at least 5 years driving experience", "If the licence is not needed for business reasons", "The Ministry is not permitted to suspend a licence before the 15-point level is reached"], correctAnswer: 0 },
  { id: 40, question: "A 'School Bus', with red signal lights flashing, is stopped on a highway that has no median strip. What does the law require you to do when meeting or overtaking the bus?", options: ["Does not matter provided you sound horn", "Stop until the bus proceeds or the signal lights are no longer flashing", "Wait for approaching vehicles to pass", "Reduce speed and pass with care"], correctAnswer: 1 },
  { id: 41, question: "Which of the following penalties can the court impose on a person convicted of driving 50 km/h (30 m.p.h.) or more over the speed limit?", options: ["Suspension of licence for 6 months", "Suspension of licence for 30 days", "Impoundment of motor vehicle for 6 months", "Imprisonment of person for 6 months"], correctAnswer: 1 },
  { id: 42, question: "Before moving your car from a parked position, you should", options: ["Check other traffic, signal and pull from the curb quickly", "Honk your horn and pull from the curb slowly", "Check other traffic, signal and pull from the curb when it is safe to do so", "Signal and pull from the curb"], correctAnswer: 2 },
  { id: 43, question: "Should your right wheels drop off the roadway, what is the best way to get back on the roadway?", options: ["Steer hard to the left", "Apply brakes and steer hard to the left", "Take foot off gas pedal, turn back when vehicle has slowed", "Apply brakes to reduce speed"], correctAnswer: 2 },
  { id: 44, question: "When 15 or more Demerit Points have accumulated on a record, the driver's licence is suspended", options: ["Automatically, and for 30 days from receipt of licence", "At the discretion of the Ministry", "Only if the licence is NOT used for business purposes", "For 3 months"], correctAnswer: 0 },
  { id: 45, question: "When the driver of another vehicle is about to overtake and pass your vehicle you must", options: ["Move to the right and allow such vehicle to pass", "Speed up so that passing is not necessary", "Signal the other driver not to pass", "Move to the left to prevent passing"], correctAnswer: 0 },
  { id: 46, question: "When descending a steep hill a good safe-driving practice is to", options: ["Gear down and allow the engine to assist in braking", "Turn off the ignition", "Place the gear shift in neutral", "Disengage the clutch and coast"], correctAnswer: 0 },
  { id: 47, question: "A driver may be required to attend an interview and re-examination of his driving ability", options: ["When 9 demerit points have been accumulated", "When 3 demerit points have been accumulated", "When 6 demerit points have been accumulated", "When 15 demerit points have been accumulated"], correctAnswer: 0 },
  { id: 48, question: "When may you lend your driver's licence?", options: ["Never", "To another person who is learning to drive", "For identification purposes only", "In emergencies"], correctAnswer: 0 },
  { id: 49, question: "When a red signal light with a green arrow is shown at an intersection it means", options: ["Stop and wait for the green light before making a turn in the direction of the arrow", "Proceed with caution in the direction of the arrow, yielding right-of-way to pedestrians and other traffic", "Stop and then proceed", "The green arrow is a signal for pedestrians only"], correctAnswer: 1 },
  { id: 50, question: "Are drivers responsible for their passengers buckling up?", options: ["Only if passengers are over sixteen years of age", "Only if passengers are from five years of age up to sixteen", "Only if the passengers are in the front seat", "Only if passengers are over eighteen years of age"], correctAnswer: 1 },
];

// ── Landing ───────────────────────────────────────────────────────────────────
function Landing({ onSelect, onBack }) {
  const [hov, setHov] = useState(null);
  const cards = [
    { key: "practice", icon: <BookOpen size={26} color={C.primary} />, iconBg: "rgba(26,86,219,0.18)", bg: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", title: "Practice Mode", desc: "Review all rules questions at your own pace. Use the eye icon to reveal answers when ready.", tag: `${rulesData.length} Questions · Self-paced`, tagStyle: { background: "rgba(26,86,219,0.35)", color: "#93c5fd" } },
    { key: "test", icon: <ClipboardList size={26} color={C.white} />, iconBg: "rgba(255,255,255,0.2)", bg: "linear-gradient(135deg,#1a56db 0%,#7c3aed 100%)", border: "none", title: "Test Mode", desc: "20 random rules questions. Score 16/20 to pass — just like the real G1 exam.", tag: "20 Questions · Pass: 16/20", tagStyle: { background: "rgba(255,255,255,0.2)", color: C.white } },
  ];
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(145deg,${C.n900} 0%,#1a3460 50%,${C.n900} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 20px", fontFamily: font, position: "relative" }}>
      {/* Back to home */}
      <button onClick={onBack} style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: 600 }}>
        <ArrowLeft size={15} /> Home
      </button>

      <div style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", color: C.accent, padding: "5px 18px", borderRadius: "50px", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 28 }}>📖 Ontario G1 Prep</div>
      <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, color: C.white, textAlign: "center", lineHeight: 1.1, letterSpacing: "-0.025em", margin: "0 0 18px" }}>Rules of<br /><span style={{ color: C.accent }}>the Road</span></h1>
      <p style={{ color: C.n400, fontSize: "1.05rem", textAlign: "center", margin: "0 0 52px", maxWidth: "460px", lineHeight: 1.75 }}>Master Ontario's driving rules. Study at your own pace or simulate the real G1 test experience.</p>
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
        {[[`${rulesData.length}`,"Total Questions"],["20","Test Qs"],["80%","Pass Mark"]].map(([n,l]) => (
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
  const [page, setPage] = useState(0);
  const PER_PAGE = 10;
  const pages = Math.ceil(rulesData.length / PER_PAGE);
  const pageData = rulesData.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const toggleExpand = id => setExpanded(p => ({ ...p, [id]: !p[id] }));
  const toggleReveal = (e, id) => { e.stopPropagation(); setRevealed(p => ({ ...p, [id]: !p[id] })); };
  const count = Object.values(revealed).filter(Boolean).length;
  const pct = Math.round((count / rulesData.length) * 100);

  return (
    <div style={{ minHeight: "100vh", background: C.n50, fontFamily: font }}>
      <PageHeader title="📖 Practice Mode — Rules" onBack={onBack} rightEl={<div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{count}/{rulesData.length} reviewed</div>} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 72px" }}>
        {showProgress && (
          <div style={{ background: `linear-gradient(135deg,${C.primary} 0%,#7c3aed 100%)`, borderRadius: 18, padding: "26px 28px", color: C.white, marginBottom: 28 }}>
            <div style={{ fontSize: "0.78rem", opacity: 0.75, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Study Progress</div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 12 }}>{pct}% Complete — {count} of {rulesData.length} questions reviewed</div>
            <div style={{ height: 10, borderRadius: 10, background: "rgba(255,255,255,0.22)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.white, borderRadius: 10, transition: "width 0.6s ease" }} />
            </div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pageData.map(q => {
            const open = !!expanded[q.id];
            const shown = !!revealed[q.id];
            return (
              <div key={q.id} style={{ background: C.white, border: `2px solid ${shown ? C.success : C.n200}`, borderRadius: 16, overflow: "hidden", boxShadow: shown ? "0 4px 20px rgba(5,150,105,0.1)" : "0 2px 8px rgba(0,0,0,0.04)", transition: "border-color 0.2s" }}>
                <div onClick={() => toggleExpand(q.id)} style={{ display: "flex", alignItems: "center", padding: "14px 18px", cursor: "pointer", gap: 12 }}>
                  <span style={{ background: shown ? C.successBg : C.primaryLight, color: shown ? C.success : C.primary, fontWeight: 700, fontSize: "0.73rem", padding: "3px 9px", borderRadius: 6, flexShrink: 0 }}>Q{q.id}</span>
                  <span style={{ flex: 1, color: C.n700, fontSize: "0.92rem", fontWeight: 500, lineHeight: 1.5 }}>{q.question}</span>
                  <button onClick={e => toggleReveal(e, q.id)} title={shown ? "Hide answer" : "Reveal answer"} style={{ width: 34, height: 34, borderRadius: 8, border: "none", background: shown ? C.successBg : C.n100, color: shown ? C.success : C.n500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {shown ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: C.n100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {open ? <ChevronUp size={15} color={C.n500} /> : <ChevronDown size={15} color={C.n500} />}
                  </div>
                </div>
                {open && (
                  <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${C.n100}` }}>
                    <p style={{ margin: "14px 0", color: C.n800, fontWeight: 700, fontSize: "0.95rem" }}>{q.question}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {q.options.map((opt, i) => {
                        const correct = i === q.correctAnswer;
                        const highlight = shown && correct;
                        return (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, background: highlight ? C.successBg : C.n100, border: `1.5px solid ${highlight ? C.success : "transparent"}` }}>
                            <div style={{ width: 28, height: 28, borderRadius: 7, background: highlight ? C.success : C.n300, color: C.white, fontWeight: 700, fontSize: "0.78rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{LETTERS[i]}</div>
                            <span style={{ flex: 1, color: highlight ? C.success : C.n700, fontWeight: highlight ? 600 : 400, fontSize: "0.9rem" }}>{opt}</span>
                            {highlight && <CheckCircle size={15} color={C.success} />}
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
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 28 }}>
          <button onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }} disabled={page === 0} style={{ background: page === 0 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: page === 0 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: page === 0 ? "default" : "pointer" }}>← Previous</button>
          <span style={{ color: C.n500, fontSize: "0.87rem", fontWeight: 600 }}>Page {page + 1} of {pages}</span>
          <button onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }} disabled={page === pages - 1} style={{ background: page === pages - 1 ? C.n100 : C.white, border: `1px solid ${C.n200}`, color: page === pages - 1 ? C.n400 : C.n700, fontWeight: 600, fontSize: "0.87rem", padding: "8px 18px", borderRadius: 8, cursor: page === pages - 1 ? "default" : "pointer" }}>Next →</button>
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
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
  const [questions] = useState(() => [...rulesData].sort(() => Math.random() - 0.5).slice(0, 20));
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
            <div style={{ opacity: 0.8, fontSize: "1rem", marginTop: 10 }}>{passed ? "Excellent! You've met the passing threshold of 16/20." : `You need ${16 - score} more correct answer${16 - score !== 1 ? "s" : ""} to pass.`}</div>
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
                  <p style={{ margin: "0 0 12px", color: C.n800, fontWeight: 600, fontSize: "0.92rem" }}>{q.question}</p>
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
      <PageHeader title="📋 Test Mode — Rules" onBack={onBack} rightEl={<div style={{ background: C.primaryLight, color: C.primary, fontWeight: 700, fontSize: "0.82rem", padding: "6px 14px", borderRadius: "50px" }}>{totalAnswered}/20 answered</div>} />
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
          <p style={{ margin: "0 0 22px", fontSize: "1.1rem", fontWeight: 700, color: C.n800, lineHeight: 1.6 }}>{q.question}</p>
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
export default function RulesOfTheRoad({ onBack }) {
  const [mode, setMode] = useState("home");
  if (mode === "practice") return <PracticeMode onBack={() => setMode("home")} />;
  if (mode === "test") return <TestMode onBack={() => setMode("home")} />;
  return <Landing onSelect={setMode} onBack={onBack} />;
}