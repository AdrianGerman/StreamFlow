import { useQuickNotes } from "../hooks/useQuickNotes"
import NoteInput from "./NoteInput"
import NoteGrid from "./NoteGrid"

export default function QuickNotes() {
  const { notes, addNote, updateNote, removeNote, clearAll } = useQuickNotes()

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

      <NoteInput onAdd={addNote} />
      <NoteGrid notes={notes} onRemove={removeNote} onUpdate={updateNote} />
    </div>
  )
}
