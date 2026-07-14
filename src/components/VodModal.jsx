import { useState } from "react"
import { TAGS } from "../constants/tags"
import { CONTENT_TYPES } from "../constants/contentTypes"
import TagBadge from "./TagBadge"

export default function VodModal({
  mode = "create",
  bucketLabel,
  initialData = null,
  onConfirm,
  onClose,
}) {
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle ?? "")
  const [contentType, setContentType] = useState(
    initialData?.contentType ?? "stream",
  )
  const [duration, setDuration] = useState(initialData?.duration ?? "")
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toISOString().slice(0, 10),
  )
  const [notes, setNotes] = useState(initialData?.notes ?? "")
  const [tags, setTags] = useState(initialData?.tags ?? [])
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl ?? "")

  const isEdit = mode === "edit"

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )

  const handleSubmit = () => {
    if (!title.trim()) return
    onConfirm({
      title: title.trim(),
      videoTitle,
      contentType,
      duration,
      date,
      notes,
      tags,
      youtubeUrl,
    })
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl p-6 w-[440px] max-h-[90vh] overflow-y-auto"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow)" }}
      >
        <h2
          className="text-[15px] font-semibold m-0 mb-0.5"
          style={{ color: "var(--text-h)" }}
        >
          {isEdit ? "Editar VOD" : "Agregar VOD"}
        </h2>
        <p className="text-[12px] m-0 mb-5" style={{ color: "var(--text)" }}>
          {isEdit ? (
            "Modifica los datos del VOD."
          ) : (
            <>
              en <strong>{bucketLabel}</strong>
            </>
          )}
        </p>

        <Field label="Tipo de contenido">
          <div className="flex gap-2">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setContentType(ct.id)}
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border text-left cursor-pointer transition-all duration-150"
                style={{
                  background:
                    contentType === ct.id
                      ? "var(--sf-green-dim)"
                      : "var(--code-bg)",
                  borderColor:
                    contentType === ct.id ? "var(--sf-green)" : "var(--border)",
                  color:
                    contentType === ct.id
                      ? "var(--sf-edit-text)"
                      : "var(--text)",
                }}
              >
                <span>{ct.icon}</span>
                <span className="text-[12px] font-medium">{ct.label}</span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Nombre del archivo *">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="ej: 2024-06-22_ranked_session"
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <Field label="Título del video">
          <input
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="ej: WIN CON SKIN DEL PASE DE BATALLA"
            className={inputCls}
            style={inputStyle}
          />
          <p className="text-[11px] mt-1" style={{ color: "var(--text)" }}>
            El nombre creativo del video que vas a publicar.
          </p>
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
          <Field label="Fecha del stream" className="flex-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputCls}
              style={inputStyle}
            />
          </Field>
        </div>

        <Field label="URL del VOD en YouTube">
          <input
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <Field label="Notas e ideas">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Momentos destacados, ideas para el video, contexto..."
            rows={3}
            className={`${inputCls} resize-y`}
            style={inputStyle}
          />
        </Field>

        <Field label="Tipo de contenido que puede generar">
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
            {isEdit ? "Guardar cambios" : "Agregar"}
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
