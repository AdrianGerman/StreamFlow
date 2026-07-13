import { useState } from "react"
import TagBadge from "./TagBadge"
import PhaseBar from "./PhaseBar"

export default function VodCard({
  vod,
  bucketId,
  destinations,
  onMove,
  onEdit,
  onAdvance,
  onRegress,
  onRemove,
}) {
  const [hovered, setHovered] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const isEditing = bucketId === "editing"
  const isTrash = bucketId === "trash"

  const handleRemove = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onRemove(bucketId, vod.id)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setConfirming(false)
      }}
      className="rounded-xl px-4 py-3 transition-all duration-200"
      style={{
        background: "var(--bg)",
        border: `1px solid ${hovered ? "var(--border)" : "var(--border)"}`,
        boxShadow: hovered ? "var(--shadow)" : "none",
        outline: hovered ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <p
          className="text-[13px] font-medium leading-snug"
          style={{ color: "var(--text-h)" }}
        >
          {vod.title}
        </p>
        {vod.date && (
          <span
            className="text-[11px] shrink-0 mt-0.5"
            style={{ color: "var(--text)" }}
          >
            {formatDate(vod.date)}
          </span>
        )}
      </div>

      {vod.duration && (
        <p className="text-[11px] mt-1" style={{ color: "var(--text)" }}>
          ⏱ {vod.duration}
        </p>
      )}

      {vod.notes && (
        <p
          className="text-[12px] leading-relaxed mt-2 px-3 py-2 rounded-lg"
          style={{ color: "var(--text)", background: "var(--code-bg)" }}
        >
          {vod.notes}
        </p>
      )}

      {vod.tags?.length > 0 && (
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {vod.tags.map((t) => (
            <TagBadge key={t} tagId={t} />
          ))}
        </div>
      )}

      {isEditing && (
        <PhaseBar
          phase={vod.phase}
          onAdvance={() => onAdvance?.(vod.id, vod.phase)}
          onRegress={() => onRegress?.(vod.id, vod.phase)}
        />
      )}

      {hovered && !isTrash && (
        <div
          className="flex items-center gap-1.5 flex-wrap mt-3 pt-2.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {destinations.length > 0 && (
            <>
              <span
                className="text-[10px] font-medium mr-0.5"
                style={{ color: "var(--text)" }}
              >
                Mover a:
              </span>
              {destinations.map((dest) => (
                <ActionBtn
                  key={dest.id}
                  onClick={() => onMove(vod.id, bucketId, dest.id)}
                >
                  {dest.label} →
                </ActionBtn>
              ))}
            </>
          )}
          <div className="ml-auto flex gap-1.5">
            {onEdit && <ActionBtn onClick={onEdit}>✎ Editar</ActionBtn>}
            <ActionBtn onClick={handleRemove} danger={confirming}>
              {confirming ? "¿Confirmar?" : "✕ Quitar"}
            </ActionBtn>
          </div>
        </div>
      )}

      {hovered && isTrash && (
        <div
          className="mt-2.5 pt-2.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <ActionBtn onClick={handleRemove} danger={confirming} fullWidth>
            {confirming ? "¿Confirmar eliminación?" : "Eliminar de StreamFlow"}
          </ActionBtn>
        </div>
      )}
    </div>
  )
}

function ActionBtn({ children, onClick, danger = false, fullWidth = false }) {
  const [hov, setHov] = useState(false)

  const base = {
    borderColor: "var(--border)",
    color: "var(--text)",
    background: "var(--bg)",
  }
  const hovered = {
    borderColor: "var(--border)",
    color: "var(--text-h)",
    background: "var(--code-bg)",
  }
  const dangerIdle = {
    borderColor: "#c0392b33",
    color: "#c0392b",
    background: "var(--bg)",
  }
  const dangerHov = {
    borderColor: "transparent",
    color: "#fff",
    background: "#c0392b",
  }

  const style = danger ? (hov ? dangerHov : dangerIdle) : hov ? hovered : base

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-all duration-150 ${fullWidth ? "w-full" : ""}`}
      style={style}
    >
      {children}
    </button>
  )
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    })
  } catch {
    return dateStr
  }
}
