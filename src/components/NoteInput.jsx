import { useState } from "react"
import { NOTE_COLORS } from "../hooks/useQuickNotes"

export default function NoteInput({ onAdd }) {
  const [text, setText] = useState("")
  const [color, setColor] = useState(null)

  const handleAdd = () => {
    if (!text.trim()) return
    onAdd(text, color)
    setText("")
    setColor(null)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className="mb-4">
      <div className="flex gap-2 mb-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe una idea rápida... (Enter para guardar)"
          rows={2}
          className="flex-1 text-[13px] rounded-lg border outline-none resize-none font-[inherit] transition-colors duration-150"
          style={{
            padding: "8px 12px",
            borderColor: text ? "var(--accent-border)" : "var(--border)",
            background: color ?? "var(--code-bg)",
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

      <div className="flex items-center gap-1.5">
        <span className="text-[11px]" style={{ color: "var(--text)" }}>
          Color:
        </span>
        {NOTE_COLORS.map((c, i) => (
          <button
            key={i}
            onClick={() => setColor(c)}
            title={c ?? "Sin color"}
            className="w-5 h-5 rounded-full border-2 cursor-pointer transition-transform duration-150 hover:scale-110"
            style={{
              background: c ?? "var(--code-bg)",
              borderColor: color === c ? "var(--text-h)" : "var(--border)",
              transform: color === c ? "scale(1.2)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  )
}
