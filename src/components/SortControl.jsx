import { SORT_OPTIONS } from "../hooks/useSortedVods"

export default function SortControl({ sortId, onChange }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--text)" }}
      >
        Ordenar:
      </span>
      <select
        value={sortId}
        onChange={(e) => onChange(e.target.value)}
        className="text-[12px] px-2.5 py-1.5 rounded-lg border cursor-pointer outline-none"
        style={{
          background: "var(--code-bg)",
          borderColor: "var(--border)",
          color: "var(--text-h)",
          fontFamily: "var(--sans)",
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
