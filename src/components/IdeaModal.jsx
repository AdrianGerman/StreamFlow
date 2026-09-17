import { useState } from "react"
import { TAGS } from "../constants/tags"
import { CONTENT_TYPES } from "../constants/contentTypes"
import TagBadge from "./TagBadge"
import ModalShell, { ModalHeader, ModalBody, ModalFooter } from "./ModalShell"
import { createSource, normalizeSources } from "../utils/ideaSources"

export default function IdeaModal({
  mode = "create",
  initialData = null,
  onConfirm,
  onClose,
}) {
  const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle ?? "")
  const [contentType, setContentType] = useState(
    initialData?.contentType ?? "stream",
  )
  const [notes, setNotes] = useState(initialData?.notes ?? "")
  const [tags, setTags] = useState(initialData?.tags ?? [])
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toLocaleDateString("en-CA"),
  )
  const [sources, setSources] = useState(() => normalizeSources(initialData))

  const isEdit = mode === "edit"

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )

  const addSource = () => setSources((prev) => [...prev, createSource()])

  const removeSource = (id) =>
    setSources((prev) =>
      prev.length === 1 ? prev : prev.filter((s) => s.id !== id),
    )

  const updateSourceRef = (id, vodRef) =>
    setSources((prev) => prev.map((s) => (s.id === id ? { ...s, vodRef } : s)))

  const addMoment = (sourceId) =>
    setSources((prev) =>
      prev.map((s) =>
        s.id === sourceId ? { ...s, moments: [...s.moments, ""] } : s,
      ),
    )

  const updateMoment = (sourceId, i, val) =>
    setSources((prev) =>
      prev.map((s) =>
        s.id === sourceId
          ? { ...s, moments: s.moments.map((m, idx) => (idx === i ? val : m)) }
          : s,
      ),
    )

  const removeMoment = (sourceId, i) =>
    setSources((prev) =>
      prev.map((s) =>
        s.id === sourceId
          ? {
              ...s,
              moments:
                s.moments.length === 1
                  ? [""]
                  : s.moments.filter((_, idx) => idx !== i),
            }
          : s,
      ),
    )

  const handleSubmit = () => {
    if (!videoTitle.trim()) return
    const cleanSources = sources
      .map((s) => ({
        ...s,
        vodRef: s.vodRef.trim(),
        moments: s.moments.map((m) => m.trim()).filter(Boolean),
      }))
      .filter((s) => s.vodRef || s.moments.length > 0)

    onConfirm({
      videoTitle: videoTitle.trim(),
      contentType,
      notes: notes.trim(),
      tags,
      date,
      sources: cleanSources,
      vodRef: cleanSources[0]?.vodRef ?? "",
      moments: cleanSources[0]?.moments ?? [],
    })
  }

  const inputStyle = {
    padding: "7px 10px",
    borderColor: "var(--border)",
    background: "var(--code-bg)",
    color: "var(--text-h)",
  }
  const inputCls =
    "w-full text-[13px] rounded-lg border outline-none font-[inherit] transition-colors duration-150"

  return (
    <ModalShell onClose={onClose} width={480}>
      <ModalHeader
        title={isEdit ? "Editar idea" : "Nueva idea"}
        sub="Plasma la idea antes de organizarla en el flujo."
        accentColor="#6d28d9"
      />
      <ModalBody>
        <Field label="Tipo de contenido de origen">
          <div className="flex gap-2">
            {CONTENT_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setContentType(ct.id)}
                className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border text-left cursor-pointer transition-all duration-150"
                style={{
                  background:
                    contentType === ct.id
                      ? "var(--sf-primary-dim)"
                      : "var(--code-bg)",
                  borderColor:
                    contentType === ct.id
                      ? "var(--sf-primary)"
                      : "var(--border)",
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

        <Field label="Idea del video *">
          <input
            autoFocus
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="ej: Las 3 victorias con la skin de Spiderman"
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <Field label="Fecha">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <label
              className="text-[11px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              VODs de origen
            </label>
            <button
              onClick={addSource}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg border-none cursor-pointer transition-opacity hover:opacity-70"
              style={{
                background: "var(--sf-primary-dim)",
                color: "var(--sf-edit-text)",
              }}
            >
              + Agregar VOD
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {sources.map((source, si) => (
              <div
                key={source.id}
                className="rounded-xl p-3"
                style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[11px] font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    VOD {si + 1}
                  </span>
                  {sources.length > 1 && (
                    <button
                      onClick={() => removeSource(source.id)}
                      className="ml-auto text-[11px] cursor-pointer border-none bg-transparent transition-opacity hover:opacity-70"
                      style={{ color: "var(--danger)" }}
                    >
                      ✕ Quitar
                    </button>
                  )}
                </div>

                <input
                  value={source.vodRef}
                  onChange={(e) => updateSourceRef(source.id, e.target.value)}
                  placeholder="ej: Stream del 30 jul — ranked"
                  className={`${inputCls} mb-2`}
                  style={{ ...inputStyle, background: "var(--bg)" }}
                />

                <div className="flex flex-col gap-1.5">
                  {source.moments.map((m, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        value={m}
                        onChange={(e) =>
                          updateMoment(source.id, i, e.target.value)
                        }
                        placeholder="ej: Headshot triple en el minuto 42"
                        className={`${inputCls} flex-1`}
                        style={{
                          ...inputStyle,
                          background: "var(--bg)",
                          padding: "5px 8px",
                        }}
                      />
                      <button
                        onClick={() => removeMoment(source.id, i)}
                        className="text-[11px] px-1.5 py-1 rounded cursor-pointer border-none"
                        style={{
                          background: "var(--border)",
                          color: "var(--text)",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addMoment(source.id)}
                    className="text-[11px] font-medium py-1 rounded-lg border border-dashed cursor-pointer transition-colors hover:border-(--sf-primary) text-left px-2"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      background: "transparent",
                    }}
                  >
                    + Agregar momento
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Field label="Notas adicionales">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contexto, referencias, ideas extra..."
            rows={2}
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
      </ModalBody>

      <ModalFooter>
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
            background: "transparent",
          }}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!videoTitle.trim()}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white disabled:opacity-40"
          style={{ background: "var(--sf-primary)" }}
        >
          {isEdit ? "Guardar cambios" : "Agregar idea"}
        </button>
      </ModalFooter>
    </ModalShell>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
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
