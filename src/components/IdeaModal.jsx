import { useState } from "react"
import { TAGS } from "../constants/tags"
import TagBadge from "./TagBadge"
import ModalShell, { ModalHeader, ModalBody, ModalFooter } from "./ModalShell"

export default function IdeaModal({
  mode = "create",
  initialData = null,
  onConfirm,
  onClose,
}) {
  const [vodRef, setVodRef] = useState(initialData?.vodRef ?? "")
  const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle ?? "")
  const [notes, setNotes] = useState(initialData?.notes ?? "")
  const [moments, setMoments] = useState(initialData?.moments ?? [""])
  const [tags, setTags] = useState(initialData?.tags ?? [])
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toISOString().slice(0, 10),
  )

  const isEdit = mode === "edit"

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )
  const updateMoment = (i, val) =>
    setMoments((prev) => prev.map((m, idx) => (idx === i ? val : m)))
  const addMoment = () => setMoments((prev) => [...prev, ""])
  const removeMoment = (i) =>
    setMoments((prev) =>
      prev.length === 1 ? [""] : prev.filter((_, idx) => idx !== i),
    )

  const handleSubmit = () => {
    if (!videoTitle.trim()) return
    onConfirm({
      vodRef: vodRef.trim(),
      videoTitle: videoTitle.trim(),
      notes: notes.trim(),
      moments: moments.map((m) => m.trim()).filter(Boolean),
      tags,
      date,
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
    <ModalShell onClose={onClose}>
      <ModalHeader
        title={isEdit ? "Editar idea" : "Nueva idea"}
        sub="Plasma la idea antes de organizarla en el flujo."
        accentColor="#6d28d9"
      />
      <ModalBody>
        <Field label="VOD de origen">
          <input
            value={vodRef}
            onChange={(e) => setVodRef(e.target.value)}
            placeholder="ej: Stream del 30 jul — ranked"
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <Field label="Idea del video *">
          <input
            autoFocus
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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

        <Field label="Momentos / clips destacados">
          <div className="flex flex-col gap-2">
            {moments.map((m, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  value={m}
                  onChange={(e) => updateMoment(i, e.target.value)}
                  placeholder={`ej: Headshot triple en el minuto 42`}
                  className={`${inputCls} flex-1`}
                  style={inputStyle}
                />
                <button
                  onClick={() => removeMoment(i)}
                  className="text-[12px] px-2 py-1.5 rounded-lg border cursor-pointer transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text)",
                    background: "var(--bg)",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={addMoment}
              className="text-[12px] font-medium py-1.5 rounded-lg border border-dashed cursor-pointer transition-colors hover:border-(--sf-primary)"
              style={{
                borderColor: "var(--border)",
                color: "var(--text)",
                background: "transparent",
              }}
            >
              + Agregar momento
            </button>
          </div>
        </Field>

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
