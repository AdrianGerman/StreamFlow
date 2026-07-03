export default function ViewHeader({ title, sub, count, onAdd }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h1
          className="text-lg font-medium mb-0.5"
          style={{ color: "var(--text-h)" }}
        >
          {title}
          {count > 0 && (
            <span
              className="ml-2 text-[12px] font-semibold px-2 py-0.5 rounded-full align-middle"
              style={{ background: "var(--code-bg)", color: "var(--text)" }}
            >
              {count}
            </span>
          )}
        </h1>
        {sub && (
          <p className="text-[13px]" style={{ color: "var(--text)" }}>
            {sub}
          </p>
        )}
      </div>

      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg border-none cursor-pointer text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--sf-green)" }}
        >
          <i className="ti ti-plus text-sm" aria-hidden="true" /> Agregar
        </button>
      )}
    </div>
  )
}
