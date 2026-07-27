export default function ViewHeader({ title, sub, count, onAdd }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h1
          className="text-[17px] font-semibold mb-0.5 flex items-center gap-2"
          style={{ color: "var(--text-h)" }}
        >
          {title}
          {count > 0 && (
            <span
              className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: "var(--code-bg)", color: "var(--text)" }}
            >
              {count}
            </span>
          )}
        </h1>
        {sub && (
          <p className="text-[12px]" style={{ color: "var(--text)" }}>
            {sub}
          </p>
        )}
      </div>

      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-lg border-none cursor-pointer text-white shrink-0 transition-opacity hover:opacity-90"
          style={{ background: "var(--sf-green)" }}
        >
          + Agregar
        </button>
      )}
    </div>
  )
}
