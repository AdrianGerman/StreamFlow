import { useState } from "react"
import { TAGS } from "../constants/tags"
import { SOURCE_TYPES, inferSourceType } from "../constants/sourceTypes"
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
  const [folderName, setFolderName] = useState(initialData?.folderName ?? "")
  const [sourceType, setSourceType] = useState(() =>
    inferSourceType(initialData),
  )
  const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle ?? "")
  const [shortsCount, setShortsCount] = useState(initialData?.shortsCount ?? 1)
  const [shortsPosted, setShortsPosted] = useState(
    initialData?.shortsPosted ?? 0,
  )
  const [date, setDate] = useState(
    initialData?.date ?? new Date().toLocaleDateString("en-CA"),
  )
  const [notes, setNotes] = useState(initialData?.notes ?? "")
  const [tags, setTags] = useState(initialData?.tags ?? ["short", "tiktok"])

  const isEdit = mode === "edit"
  const showFile = sourceType === "file" || sourceType === "both"
  const showFolder = sourceType === "folder" || sourceType === "both"
  const canSubmit =
    (showFile ? !!title.trim() : true) &&
    (showFolder ? !!folderName.trim() : true)

  const toggleTag = (id) =>
    setTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    )

  const handleSubmit = () => {
    if (!canSubmit) return
    onConfirm({
      title: showFile ? title.trim() : "",
      folderName: showFolder ? folderName.trim() : "",
      sourceType,
      videoTitle: videoTitle.trim() || title.trim() || folderName.trim(),
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
        <Field label="Tipo de origen">
          <div className="flex gap-2">
            {SOURCE_TYPES.map((st) => (
              <button
                key={st.id}
                onClick={() => setSourceType(st.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border cursor-pointer transition-all duration-150"
                style={{
                  background:
                    sourceType === st.id
                      ? "var(--sf-primary-dim)"
                      : "var(--code-bg)",
                  borderColor:
                    sourceType === st.id
                      ? "var(--sf-primary)"
                      : "var(--border)",
                  color:
                    sourceType === st.id
                      ? "var(--sf-edit-text)"
                      : "var(--text)",
                }}
              >
                <span>{st.icon}</span>
                <span className="text-[12px] font-medium">{st.label}</span>
              </button>
            ))}
          </div>
        </Field>

        {showFile && (
          <Field label="Nombre del archivo *">
            <input
              autoFocus={showFile}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ej: stream_2024-06-22"
              className={inputCls}
              style={inputStyle}
            />
          </Field>
        )}

        {showFolder && (
          <Field label="Nombre de la carpeta *">
            <input
              autoFocus={!showFile}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="ej: 22 de junio — Ranked"
              className={inputCls}
              style={inputStyle}
            />
          </Field>
        )}

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
          disabled={!canSubmit}
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
