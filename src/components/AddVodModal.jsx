import { useState } from "react"
import { TAGS } from "../constants/tags"
import TagBadge from "./TagBadge"

export default function AddVodModal({ bucketLabel, onAdd, onClose }) {
  const [title, setTitle] = useState("")
  const [duration, setDuration] = useState("")
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [notes, setNotes] = useState("")
  const [tags, setTags] = useState([])

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd({ title: title.trim(), duration, date, notes, tags })
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.35)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl p-6 w-[380px]"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow)" }}
      >
        <h2
          className="text-[15px] font-semibold m-0 mb-0.5"
          style={{ color: "var(--text-h)" }}
        >
          Agregar VOD
        </h2>
        <p className="text-[12px] m-0 mb-5" style={{ color: "var(--text)" }}>
          en <strong>{bucketLabel}</strong>
        </p>

        <Field label="Título *">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="ej: Stream 22 jun — ranked"
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <div className="flex gap-2.5">
          <Field label="Duración" className="flex-1">
            <input
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="ej: 2h 30m"
              className={inputCls}
              style={inputStyle}
            />
          </Field>
          <Field label="Fecha" className="flex-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="Notas">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ideas, momentos importantes, contexto..."
            rows={2}
            className={`${inputCls} resize-y`}
            style={inputStyle}
          />
        </Field>

        <Field label="Tipo de contenido">
          <div className="flex gap-2 flex-wrap">
            {TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className="cursor-pointer rounded-full border px-2.5 py-1 text-[11px] font-semibold transition-all duration-150"
                style={{
                  borderColor: tags.includes(tag.id)
                    ? "transparent"
                    : "var(--border)",
                  background: tags.includes(tag.id)
                    ? "transparent"
                    : "var(--code-bg)",
                  color: tags.includes(tag.id) ? "inherit" : "var(--text)",
                }}
              >
                {tags.includes(tag.id) ? (
                  <TagBadge tagId={tag.id} />
                ) : (
                  tag.label
                )}
              </button>
            ))}
          </div>
        </Field>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border transition-colors duration-150"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "var(--bg)",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white transition-opacity disabled:opacity-40"
            style={{ background: "var(--sf-green)" }}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children, className = "" }) {
  return (
    <div className={`mb-3 ${className}`}>
      <label
        className="block text-[11px] font-semibold mb-1"
        style={{ color: "var(--text)" }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  "w-full text-[13px] rounded-lg border outline-none font-[inherit] transition-colors duration-150"
const inputStyle = {
  padding: "7px 10px",
  borderColor: "var(--border)",
  background: "var(--code-bg)",
  color: "var(--text-h)",
}
