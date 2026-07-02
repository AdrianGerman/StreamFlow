export default function EmptyState({ text, onAdd }) {
  return (
    <div
      className="rounded-xl border border-dashed p-10 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="text-[13px] mb-3" style={{ color: "var(--text)" }}>
        {text}
      </p>
      {onAdd && (
        <button
          onClick={onAdd}
          className="text-[13px] font-medium px-4 py-2 rounded-lg cursor-pointer border-none text-white"
          style={{ background: "var(--sf-green)" }}
        >
          + Agregar VOD
        </button>
      )}
    </div>
  )
}
