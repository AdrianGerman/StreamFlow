export default function EmptyState({ text, onAdd, addLabel = "Agregar" }) {
  return (
    <div
      className="rounded-xl border border-dashed py-12 px-8 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="text-[13px] mb-3" style={{ color: "var(--text)" }}>
        {text}
      </p>
      {onAdd && (
        <button
          onClick={onAdd}
          className="text-[12px] font-medium px-4 py-2 rounded-lg cursor-pointer border-none text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--sf-primary)" }}
        >
          + {addLabel}
        </button>
      )}
    </div>
  )
}
