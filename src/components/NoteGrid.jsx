import { useState } from "react"
import { NOTE_COLORS } from "../hooks/useQuickNotes"

export default function NoteGrid({ notes, onRemove, onUpdate }) {
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
        <NoteItem
          key={note.id}
          note={note}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}

function isLightColor(hex) {
  if (!hex) return true
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5
}

function NoteItem({ note, onRemove, onUpdate }) {
  const [hovered, setHovered] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(note.text)
  const [showColors, setShowColors] = useState(false)

  const bg = note.color ?? "var(--code-bg)"
  const textColor = note.color
    ? isLightColor(note.color)
      ? "#1a1a18"
      : "#f3f4f6"
    : "var(--text-h)"

  const handleSave = () => {
    if (editText.trim()) onUpdate(note.id, { text: editText.trim() })
    setEditing(false)
    setShowColors(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === "Escape") {
      setEditing(false)
      setEditText(note.text)
      setShowColors(false)
    }
  }

  const handleColorChange = (color) => {
    onUpdate(note.id, { color })
    setShowColors(false)
  }

  const startEdit = () => {
    setEditing(true)
    setShowColors(false)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        if (!editing && !showColors) setHovered(false)
      }}
      className="relative flex flex-col gap-1.5 px-3 py-2.5 rounded-lg transition-all duration-150"
      style={{
        background: bg,
        transform: hovered && !editing ? "scale(1.02)" : "scale(1)",
        boxShadow: hovered || editing ? "var(--shadow)" : "none",
        minHeight: 80,
      }}
    >
      {editing ? (
        <textarea
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          className="w-full text-[12px] rounded border outline-none resize-none font-[inherit] bg-transparent"
          style={{ borderColor: "rgba(0,0,0,0.15)", color: textColor }}
        />
      ) : (
        <p
          className="text-[12px] leading-relaxed flex-1"
          style={{ color: textColor }}
        >
          {note.text}
        </p>
      )}

      {hovered && !editing && (
        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={startEdit}
            className="text-[11px] px-1.5 py-0.5 rounded cursor-pointer border-none transition-colors duration-150"
            style={{ background: "rgba(0,0,0,0.12)", color: textColor }}
            title="Editar nota"
          >
            ✎ Editar
          </button>
          <button
            onClick={() => onRemove(note.id)}
            className="text-[11px] px-1.5 py-0.5 rounded cursor-pointer border-none ml-auto transition-colors duration-150"
            style={{ background: "rgba(192,57,43,0.15)", color: "#c0392b" }}
            title="Eliminar nota"
          >
            ✕
          </button>
        </div>
      )}

      {editing && (
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          <button
            onClick={handleSave}
            className="text-[11px] px-2 py-0.5 rounded cursor-pointer border-none font-medium text-white"
            style={{ background: "var(--sf-primary)" }}
          >
            Guardar
          </button>
          <button
            onClick={() => setShowColors((v) => !v)}
            className="text-[11px] px-1.5 py-0.5 rounded cursor-pointer border-none"
            style={{ background: "rgba(0,0,0,0.12)", color: textColor }}
            title="Cambiar color"
          >
            🎨
          </button>
          <button
            onClick={() => {
              setEditing(false)
              setEditText(note.text)
              setShowColors(false)
            }}
            className="text-[11px] px-1.5 py-0.5 rounded cursor-pointer border-none ml-auto"
            style={{ background: "rgba(0,0,0,0.08)", color: textColor }}
          >
            Cancelar
          </button>
        </div>
      )}

      {showColors && editing && (
        <div
          className="flex gap-1.5 flex-wrap p-2 rounded-lg mt-1"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          {NOTE_COLORS.map((c, i) => (
            <button
              key={i}
              onClick={() => handleColorChange(c)}
              className="w-6 h-6 rounded-full border-2 cursor-pointer transition-transform duration-150 hover:scale-110"
              style={{
                background: c ?? "var(--code-bg)",
                borderColor: note.color === c ? "#333" : "rgba(0,0,0,0.2)",
              }}
              title={c ?? "Sin color"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
