import { useState } from "react"
import { TAGS } from "../constants/tags"
import { CONTENT_TYPES } from "../constants/contentTypes"
import { SOURCE_TYPES, inferSourceType } from "../constants/sourceTypes"
import TagBadge from "./TagBadge"
import ModalShell, { ModalHeader, ModalBody, ModalFooter } from "./ModalShell"

export default function VodModal({
  mode = "create",
  bucketLabel,
  initialData = null,
  defaultContentType = "stream",
  onConfirm,
  onClose,
}) {
  const [title, setTitle] = useState(initialData?.title ?? "")
  const [folderName, setFolderName] = useState(initialData?.folderName ?? "")
  const [sourceType, setSourceType] = useState(() =>
    inferSourceType(initialData),
  )
  const [videoTitle, setVideoTitle] = useState(initialData?.videoTitle ?? "")
  const [contentType, setContentType] = useState(
    initialData?.contentType ?? defaultContentType,
  )
  const [tags, setTags] = useState(initialData?.tags ?? [])

  const hasDetails = !!(
    initialData?.duration ||
    initialData?.date ||
    initialData?.youtubeUrl ||
    initialData?.playlist ||
    initialData?.notes
  )
  const [showDetails, setShowDetails] = useState(hasDetails)
  const [duration, setDuration] = useState(initialData?.duration ?? "")
  const [date, setDate] = useState(initialData?.date ?? "")
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl ?? "")
  const [playlist, setPlaylist] = useState(initialData?.playlist ?? "")
  const [notes, setNotes] = useState(initialData?.notes ?? "")

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
      videoTitle,
      contentType,
      tags,
      duration,
      date,
      youtubeUrl,
      playlist,
      notes,
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
        title={isEdit ? "Editar VOD" : "Agregar VOD"}
        sub={
          isEdit ? "Modifica los datos del VOD." : `Agregando en ${bucketLabel}`
        }
      />
      <ModalBody>
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
              placeholder="ej: 2024-06-22_ranked_session"
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
              placeholder="ej: 19 de junio — Ranked"
              className={inputCls}
              style={inputStyle}
            />
          </Field>
        )}

        <Field label="Título del video">
          <input
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="ej: WIN CON SKIN DEL PASE DE BATALLA"
            className={inputCls}
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

        <button
          onClick={() => setShowDetails((v) => !v)}
          className="flex items-center gap-1.5 text-[12px] font-medium cursor-pointer border-none bg-transparent transition-opacity hover:opacity-70 mb-1"
          style={{ color: "var(--sf-primary)" }}
        >
          <span
            style={{
              display: "inline-block",
              transition: "transform 0.2s",
              transform: showDetails ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            ▶
          </span>
          {showDetails ? "Ocultar detalles" : "+ Más detalles"}
        </button>

        {showDetails && (
          <div
            className="flex flex-col gap-0 rounded-xl p-3 mt-1"
            style={{
              background: "var(--code-bg)",
              border: "1px solid var(--border)",
            }}
          >
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
            <Field label="URL del VOD en YouTube">
              <input
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={inputCls}
                style={inputStyle}
              />
            </Field>
            <Field label="Playlist de YouTube">
              <input
                value={playlist}
                onChange={(e) => setPlaylist(e.target.value)}
                placeholder="ej: Temporada 3 — Ranked"
                className={inputCls}
                style={inputStyle}
              />
            </Field>
            <Field label="Notas e ideas" className="mb-0">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Momentos destacados, ideas para el video..."
                rows={3}
                className={`${inputCls} resize-y`}
                style={inputStyle}
              />
            </Field>
          </div>
        )}
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
          {isEdit ? "Guardar cambios" : "Agregar"}
        </button>
      </ModalFooter>
    </ModalShell>
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
