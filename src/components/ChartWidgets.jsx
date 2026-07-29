/* eslint-disable react-refresh/only-export-components */
export function TotalCard({ label, value, icon }) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
    >
      <p className="text-xl mb-1">{icon}</p>
      <p
        className="text-2xl font-semibold mb-0.5"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
      <p className="text-[11px]" style={{ color: "var(--text)" }}>
        {label}
      </p>
    </div>
  )
}

export function ChartCard({ title, sub, children }) {
  return (
    <div
      className="rounded-xl p-5 border"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <p
        className="text-[14px] font-semibold mb-0.5"
        style={{ color: "var(--text-h)" }}
      >
        {title}
      </p>
      <p className="text-[12px] mb-4" style={{ color: "var(--text)" }}>
        {sub}
      </p>
      {children}
    </div>
  )
}

export function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-lg px-3 py-2 text-[12px] border"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <p className="font-semibold mb-1" style={{ color: "var(--text-h)" }}>
        Semana del {label}
      </p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  )
}

export const tickStyle = { fontSize: 11, fill: "var(--text)" }
