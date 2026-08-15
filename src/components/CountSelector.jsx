export default function CountSelector({
  value,
  onChange,
  quickOptions = [1, 2, 3, 4, 5, 6],
  min = 1,
  max = 99,
}) {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      {quickOptions.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className="w-11 h-11 rounded-xl text-[14px] font-semibold border cursor-pointer transition-all duration-150"
          style={{
            background: value === n ? "var(--sf-primary)" : "var(--code-bg)",
            borderColor: value === n ? "var(--sf-primary)" : "var(--border)",
            color: value === n ? "#fff" : "var(--text-h)",
          }}
        >
          {n}
        </button>
      ))}
      <div className="flex items-center gap-1.5 ml-1">
        <span className="text-[12px]" style={{ color: "var(--text)" }}>
          o
        </span>
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) =>
            onChange(Math.max(min, parseInt(e.target.value) || min))
          }
          className="w-14 text-center text-[13px] rounded-lg border outline-none"
          style={{
            padding: "8px 4px",
            borderColor: "var(--border)",
            background: "var(--code-bg)",
            color: "var(--text-h)",
          }}
        />
      </div>
    </div>
  )
}
