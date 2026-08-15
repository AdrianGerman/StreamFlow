export default function NoteGrid({ notes, onRemove }) {
  if (notes.length === 0) {
    return (
      <p
        className="text-[12px] text-center py-3"
        style={{ color: "var(--text)" }}
      >
        Sin notas. Anota ideas rápidas aquí para no perderlas.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {notes.map((note) => (
        <div
          key={note.id}
          className="group flex items-start gap-2 px-3 py-2.5 rounded-lg"
          style={{ background: "var(--code-bg)" }}
        >
          <p
            className="flex-1 text-[12px] leading-relaxed"
            style={{ color: "var(--text-h)" }}
          >
            {note.text}
          </p>
          <button
            onClick={() => onRemove(note.id)}
            className="text-[11px] cursor-pointer border-none bg-transparent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
            style={{ color: "var(--text)" }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
