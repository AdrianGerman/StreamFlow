import { useState } from "react"
import { TAGS } from "../constants/tags"
import TagBadge from "./TagBadge"
import CountSelector from "./CountSelector"
import ModalShell, { ModalHeader, ModalBody, ModalFooter } from "./ModalShell"

export default function ShortModal({
  mode = "create",
  initialData = null,
  onConfirm,
  onClose,
}) {
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle ?? "")
  const [shortsCount, setShortsCount] = useState(initialData?.shortsCount ?? 1)
  const [shortsPosted, setShortsPosted] = useState(
    initialData?.shortsPosted ?? 0,
  )
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toISOString().slice(0, 10),
  )
  const [notes, setNotes] = useState(initialData?.notes ?? "")
  const [tags, setTags] = useState(initialData?.tags ?? ["short", "tiktok"])

  const isEdit = mode === "edit"
  const relevantTags = TAGS

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )

  const handleSubmit = () => {
    if (!title.trim()) return
    onConfirm({
      title: title.trim(),
      videoTitle: videoTitle.trim() || title.trim(),
      shortsCount,
      shortsPosted: Math.min(shortsPosted, shortsCount),
      date,
      notes,
      tags,
      shortsReady: true,
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
    <ModalShell onClose={onClose} width={420}>
      <ModalHeader
        title={isEdit ? "Editar shorts" : "Agregar shorts al pool"}
        sub={
          isEdit
            ? "Modifica la información de estos shorts."
            : "Agrega shorts directamente sin pasar por el flujo completo."
        }
        accentColor="#be185d"
      />
      <ModalBody>
        <Field label="Nombre del archivo / origen *">
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ej: stream_2024-06-22"
            className={inputCls}
            style={inputStyle}
          />
        </Field>

        <Field label="Título del video">
          <input
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="ej: Clips del stream del 22 jun"
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

        <Field label="¿Cuántos shorts tienes?">
          <CountSelector value={shortsCount} onChange={setShortsCount} />
        </Field>

        <Field label="¿Cuántos ya subiste?">
          <CountSelector
            value={shortsPosted}
            onChange={(v) => setShortsPosted(Math.min(v, shortsCount))}
            quickOptions={[0, 1, 2, 3, 4, 5, 6]}
          />
          <p className="text-[11px] mt-1" style={{ color: "var(--text)" }}>
            Si ya subiste algunos, márcalos aquí directamente.
          </p>
        </Field>

        <Field label="Notas">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contexto, juego, fecha del stream..."
            rows={2}
            className={`${inputCls} resize-y`}
            style={inputStyle}
          />
        </Field>

        <Field label="Tipo de contenido">
          <div className="flex gap-2 flex-wrap">
            {relevantTags.map((tag) => (
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
          disabled={!title.trim()}
          className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white disabled:opacity-40"
          style={{ background: "var(--sf-primary)" }}
        >
          {isEdit ? "Guardar cambios" : "Agregar al pool"}
        </button>
      </ModalFooter>
    </ModalShell>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label
        className="block text-[11px] font-semibold mb-1.5"
        style={{ color: "var(--text)" }}
      >
        {label}
      </label>
      {children}
    </div>
  )
}
