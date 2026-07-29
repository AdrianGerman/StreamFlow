export function StatCard({ label, value, sub, onClick, warn }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-4 border cursor-pointer transition-all duration-150 hover:border-(--accent-border) w-full bg-transparent"
      style={{
        background: "var(--code-bg)",
        borderColor: warn && value > 0 ? "#f5a623" : "var(--border)",
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-widest mb-2"
        style={{ color: "var(--text)" }}
      >
        {label}
      </p>
      <p
        className="text-3xl font-semibold mb-1"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
      <p className="text-[11px]" style={{ color: "var(--text)" }}>
        {sub}
      </p>
    </button>
  )
}

export function TodayItem({ suggestion: s, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-3 border text-left w-full cursor-pointer transition-all duration-150 hover:border-(--accent-border) bg-transparent"
      style={{
        background: "var(--bg)",
        borderColor: s.urgent ? "#f5a623" : "var(--border)",
      }}
    >
      <span className="text-xl shrink-0">{s.icon}</span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-medium truncate"
          style={{ color: "var(--text-h)" }}
        >
          {s.title}
        </p>
        <p
          className="text-[11px] mt-0.5 truncate"
          style={{ color: "var(--text)" }}
        >
          {s.sub}
        </p>
      </div>
      <span
        className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0"
        style={{ background: s.tagBg, color: s.tagColor }}
      >
        {s.tag}
      </span>
    </button>
  )
}

export function PhaseRow({ n, currentPhase }) {
  const done = n < currentPhase
  const active = n === currentPhase
  const labels = ["Cortar", "Zoom y edición", "Música", "Intro y outro"]

  return (
    <div
      className="flex items-center gap-3 rounded-lg px-3 py-2"
      style={{
        background: done || active ? "var(--sf-edit-bg)" : "var(--code-bg)",
        border: active ? "1px solid var(--sf-green)" : "1px solid transparent",
        opacity: n > currentPhase ? 0.5 : 1,
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 text-white"
        style={{
          background: done || active ? "var(--sf-green)" : "var(--border)",
        }}
      >
        {done ? "✓" : n}
      </span>
      <span
        className="text-[12px] font-medium"
        style={{
          color: done || active ? "var(--sf-edit-text)" : "var(--text)",
        }}
      >
        {labels[n - 1]}
      </span>
    </div>
  )
}

export function SectionTitle({ children }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-widest mb-3"
      style={{ color: "var(--text)" }}
    >
      {children}
    </p>
  )
}
