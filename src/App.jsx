import React, { useMemo, useState } from "react";
import "./style.css";

const initialRequests = [
  { id: "PS-1001", topic: "Eligibility clarification", details: "Synthetic example: asks where to verify an eligibility requirement.", status: "New", priority: "Normal", owner: "Placement support", created: "2026-10-20", synthetic: true, history: ["Created in demo"] },
  { id: "PS-1002", topic: "Application status", details: "Synthetic example: asks how to check whether an application was submitted.", status: "In review", priority: "Normal", owner: "Placement support", created: "2026-10-20", synthetic: true, history: ["Created in demo", "Assigned to Placement support"] }
];

const statuses = ["New", "In review", "Waiting for student", "Resolved", "Escalated"];
const blank = { topic: "", details: "", studentRef: "", status: "New", priority: "Normal", owner: "Placement support" };

function validate(req) {
  const errors = [];
  if (!req.topic.trim()) errors.push("Add a short topic.");
  if (!req.details.trim()) errors.push("Add enough detail to understand the query.");
  if (!req.studentRef.trim()) errors.push("Add a demo reference code (never use a real student ID).");
  return errors;
}
function duplicateOf(req, items) {
  const key = `${req.topic.trim().toLowerCase()}|${req.details.trim().toLowerCase()}`;
  return items.find(x => `${x.topic.trim().toLowerCase()}|${x.details.trim().toLowerCase()}` === key);
}

export default function App() {
  const [requests, setRequests] = useState(initialRequests);
  const [form, setForm] = useState(blank);
  const [notice, setNotice] = useState({ type: "info", text: "Demo mode: all example records are synthetic. Do not enter real student information." });
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState("PS-1001");
  const [events, setEvents] = useState([{ time: "Demo start", action: "Synthetic records loaded" }]);
  const filtered = useMemo(() => requests.filter(r => filter === "All" || r.status === filter), [requests, filter]);
  const current = requests.find(r => r.id === selected) || filtered[0];

  function record(action) {
    setEvents(old => [{ time: new Date().toLocaleString(), action }, ...old].slice(0, 20));
  }
  function submit(e) {
    e.preventDefault();
    const errors = validate(form);
    if (errors.length) {
      setNotice({ type: "error", text: `Cannot submit: ${errors.join(" ")}` });
      record("Submission blocked: required information missing");
      return;
    }
    const duplicate = duplicateOf(form, requests);
    if (duplicate) {
      setNotice({ type: "error", text: `Possible duplicate of ${duplicate.id}. No new request was created; review the existing record instead.` });
      record(`Possible duplicate detected against ${duplicate.id}`);
      setSelected(duplicate.id);
      return;
    }
    const id = `PS-${1000 + requests.length + 1}`;
    const item = { ...form, id, created: new Date().toISOString().slice(0, 10), synthetic: true, history: ["Created in demo"] };
    setRequests(old => [item, ...old]);
    setSelected(id);
    setForm(blank);
    setNotice({ type: "success", text: `${id} created in the local demo. This does not contact the college.` });
    record(`Created synthetic request ${id}`);
  }
  function updateStatus(nextStatus) {
    if (!current) return;
    if (nextStatus === "Resolved" && current.status === "Escalated") {
      setNotice({ type: "error", text: "An escalated item cannot be resolved directly in this demo. Return it to review after the authorised role checks it." });
      record(`Blocked direct resolution for ${current.id}`);
      return;
    }
    if (nextStatus === "Resolved" && !current.details.trim()) {
      setNotice({ type: "error", text: "Cannot resolve a request without details." });
      record(`Blocked resolution for ${current.id}: missing details`);
      return;
    }
    setRequests(old => old.map(r => r.id === current.id ? { ...r, status: nextStatus, history: [...r.history, `Status changed to ${nextStatus}`] } : r));
    setNotice({ type: "success", text: `${current.id} status changed to ${nextStatus} in the local demo.` });
    record(`${current.id}: status changed to ${nextStatus}`);
  }
  function resetDemo() {
    setRequests(initialRequests);
    setForm(blank);
    setFilter("All");
    setSelected("PS-1001");
    setEvents([{ time: "Demo reset", action: "Synthetic records restored" }]);
    setNotice({ type: "info", text: "Demo reset. All records are synthetic; no college system is connected." });
  }

  return <main className="shell">
    <header className="hero">
      <div className="eyebrow">ROUND 2 · TASK 1 · PROTOTYPE</div>
      <h1>Placement Support Query Tracker</h1>
      <p>A local demonstration of a proposed student-query workflow. It is not the college's portal and does not send messages or store data on a server.</p>
      <div className="banner"><strong>Privacy & evidence note:</strong> use fictional details only. All starter records are synthetic. This prototype demonstrates proposed behaviour, not current college practice.</div>
    </header>

    {notice && <div className={`notice ${notice.type}`} role="status">{notice.text}</div>}

    <section className="stats">
      <div className="stat"><span>Total demo queries</span><strong>{requests.length}</strong></div>
      <div className="stat"><span>Open queries</span><strong>{requests.filter(r => !["Resolved"].includes(r.status)).length}</strong></div>
      <div className="stat"><span>Escalated</span><strong>{requests.filter(r => r.status === "Escalated").length}</strong></div>
    </section>

    <div className="columns">
      <section className="panel">
        <div className="panel-head"><div><div className="eyebrow">01 · SUBMIT</div><h2>Create a query</h2></div></div>
        <form onSubmit={submit}>
          <label>Query topic <span>*</span><input value={form.topic} onChange={e => setForm({...form, topic: e.target.value})} placeholder="e.g. Eligibility clarification" /></label>
          <label>Details <span>*</span><textarea value={form.details} onChange={e => setForm({...form, details: e.target.value})} placeholder="Describe the question using fictional information only." rows="4" /></label>
          <label>Demo reference code <span>*</span><input value={form.studentRef} onChange={e => setForm({...form, studentRef: e.target.value})} placeholder="e.g. DEMO-007 (not a real ID)" /></label>
          <div className="two">
            <label>Priority<select value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}><option>Normal</option><option>Urgent</option></select></label>
            <label>Assigned role<select value={form.owner} onChange={e => setForm({...form, owner: e.target.value})}><option>Placement support</option><option>Authorised reviewer</option><option>Technical support</option></select></label>
          </div>
          <button type="submit">Submit synthetic query</button>
          <p className="hint">Required-field validation and duplicate detection run locally in your browser session.</p>
        </form>
      </section>

      <section className="panel">
        <div className="panel-head"><div><div className="eyebrow">02 · TRACK</div><h2>Query queue</h2></div>
          <button className="secondary" type="button" onClick={resetDemo}>Reset demo</button>
        </div>
        <label className="filter">Filter by status<select value={filter} onChange={e => setFilter(e.target.value)}><option>All</option>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
        <div className="queue">
          {filtered.map(r => <button type="button" key={r.id} className={`queue-item ${selected === r.id ? "active" : ""}`} onClick={() => setSelected(r.id)}>
            <div className="queue-top"><strong>{r.id}</strong><span className={`pill ${r.status.toLowerCase().replaceAll(" ", "-")}`}>{r.status}</span></div>
            <div className="queue-title">{r.topic}</div><small>{r.owner} · {r.created}</small>
          </button>)}
          {filtered.length === 0 && <p className="hint">No requests match this filter.</p>}
        </div>
        {current && <div className="detail">
          <div className="eyebrow">SELECTED QUERY</div><h3>{current.id} · {current.topic}</h3><p>{current.details}</p>
          <p className="hint">Reference: {current.studentRef || "Synthetic starter record"} · Priority: {current.priority}</p>
          <label>Change status (demo only)<select value={current.status} onChange={e => updateStatus(e.target.value)}>{statuses.map(s => <option key={s}>{s}</option>)}</select></label>
          <p className="hint">Approval boundary: this prototype cannot verify eligibility, make hiring decisions, or send official responses.</p>
        </div>}
      </section>
    </div>

    <section className="panel audit">
      <div className="panel-head"><div><div className="eyebrow">03 · AUDIT</div><h2>Local activity log</h2></div></div>
      <p className="hint">The log is held in page memory and resets when you reload. It is a demonstration audit trail, not tamper-proof production logging.</p>
      <ul className="events">{events.map((ev, i) => <li key={i}><span>{ev.time}</span><strong>{ev.action}</strong></li>)}</ul>
    </section>
    <footer>Prototype status: illustrative · Data: synthetic · External integrations: none · Production use: not approved</footer>
  </main>;
}
