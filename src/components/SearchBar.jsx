export default function SearchBar({ query, onChange, total, found }) {
  const showCount = query.trim() && found !== total

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1">
        <span
          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] pointer-events-none"
          style={{ color: "var(--text)" }}
        >
          🔍
        </span>
        <input
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Buscar VODs..."
          className="w-full text-[13px] rounded-lg border outline-none pl-8 pr-8 py-1.5 transition-colors duration-150"
          style={{
            background: "var(--code-bg)",
            borderColor: query ? "var(--accent-border)" : "var(--border)",
            color: "var(--text-h)",
            fontFamily: "var(--sans)",
          }}
        />
        {query && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[12px] cursor-pointer"
            style={{ color: "var(--text)", background: "none", border: "none" }}
          >
            ✕
          </button>
        )}
      </div>

      {showCount && (
        <span
          className="text-[11px] whitespace-nowrap"
          style={{ color: "var(--text)" }}
        >
          {found} de {total}
        </span>
      )}
    </div>
  )
}
