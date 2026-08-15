import { useState } from "react"

export default function NoteInput({ onAdd }) {
  const [text, setText] = useState("")

  const handleAdd = () => {
    if (!text.trim()) return
    onAdd(text)
    setText("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
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
  )
}
