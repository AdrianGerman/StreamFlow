import { useState } from "react"
import { useQuickNotes } from "../hooks/useQuickNotes"

export default function QuickNotes() {
  const { notes, addNote, removeNote, clearAll } = useQuickNotes()
  const [text, setText] = useState("")

  const handleAdd = () => {
    if (!text.trim()) return
    addNote(text)
    setText("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--text)" }}
        >
          📝 Notas rápidas
        </p>
        {notes.length > 0 && (
          <button
            onClick={clearAll}
            className="text-[11px] cursor-pointer border-none bg-transparent transition-opacity hover:opacity-70"
            style={{ color: "var(--text)" }}
          >
            Borrar todo
          </button>
        )}
      </div>

      <div className="flex gap-2 mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una idea rápida... (Enter para guardar, Shift+Enter para nueva línea)"
          rows={2}
          className="flex-1 text-[13px] rounded-lg border outline-none resize-none font-[inherit] transition-colors duration-150"
          style={{
            padding: "8px 12px",
            borderColor: text ? "var(--accent-border)" : "var(--border)",
            background: "var(--code-bg)",
            color: "var(--text-h)",
          }}
        />
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="px-4 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white transition-opacity disabled:opacity-30 self-stretch"
          style={{ background: "var(--sf-primary)" }}
        >
          Guardar
        </button>
      </div>

      {notes.length === 0 ? (
        <p
          className="text-[12px] text-center py-3"
          style={{ color: "var(--text)" }}
        >
          Sin notas. Anota ideas rápidas aquí para no perderlas.
        </p>
      ) : (
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
                onClick={() => removeNote(note.id)}
                className="text-[11px] cursor-pointer border-none bg-transparent opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                style={{ color: "var(--text)" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
