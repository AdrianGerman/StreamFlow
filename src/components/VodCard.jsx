import { useState } from "react"
import TagBadge from "./TagBadge"
import PhaseBar from "./PhaseBar"
import ShortsModal from "./ShortsModal"
import { CONTENT_TYPE_MAP } from "../constants/contentTypes"

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
  const [shortsTarget, setShortsTarget] = useState(null)

  const isEditing = bucketId === "editing"
  const isTrash = bucketId === "trash"
  const ct = CONTENT_TYPE_MAP[vod.contentType ?? "stream"]

  const handleRemove = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onRemove(bucketId, vod.id)
  }

  const handleMove = (destId) => {
    if (destId === "shorts") {
      setShortsTarget(destId)
    } else {
      onMove(vod.id, bucketId, destId)
    }
  }

  const handleShortsConfirm = (count) => {
    onMove(vod.id, bucketId, shortsTarget, {
      shortsCount: count,
      shortsPosted: 0,
    })
    setShortsTarget(null)
  }

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false)
          setConfirming(false)
        }}
        className="rounded-xl px-4 py-3 transition-all duration-200"
        style={{
          background: "var(--bg)",
          border: "1px solid var(--border)",
          boxShadow: hovered ? "var(--shadow)" : "none",
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span
            className="text-[10px] font-semibold uppercase tracking-wide"
            style={{ color: "var(--text)" }}
          >
            {ct?.icon} {ct?.label}
          </span>
          {vod.date && (
            <span className="text-[11px]" style={{ color: "var(--text)" }}>
              {formatDate(vod.date)}
            </span>
          )}
        </div>

        <p
          className="text-[12px] leading-snug"
          style={{ color: "var(--text)" }}
        >
          {vod.title}
        </p>

        {vod.videoTitle && (
          <p
            className="text-[14px] font-semibold leading-snug mt-1"
            style={{ color: "var(--text-h)" }}
          >
            {vod.videoTitle}
          </p>
        )}

        {vod.duration && (
          <p className="text-[11px] mt-1" style={{ color: "var(--text)" }}>
            ⏱ {vod.duration}
          </p>
        )}

        {vod.youtubeUrl && (
          <a
            href={vod.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium mt-1.5 transition-opacity hover:opacity-70"
            style={{ color: "var(--sf-green)" }}
            onClick={(e) => e.stopPropagation()}
          >
            ▶ Ver VOD en YouTube
          </a>
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
                  <ActionBtn key={dest.id} onClick={() => handleMove(dest.id)}>
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
              {confirming
                ? "¿Confirmar eliminación?"
                : "Eliminar de StreamFlow"}
            </ActionBtn>
          </div>
        )}
      </div>

      {shortsTarget && (
        <ShortsModal
          vod={vod}
          onConfirm={handleShortsConfirm}
          onClose={() => setShortsTarget(null)}
        />
      )}
    </>
  )
}

function ActionBtn({ children, onClick, danger = false, fullWidth = false }) {
  const [hov, setHov] = useState(false)
  const style = danger
    ? hov
      ? {
          background: "var(--danger)",
          color: "#fff",
          borderColor: "transparent",
        }
      : {
          background: "var(--bg)",
          color: "var(--danger)",
          borderColor: "var(--danger-border)",
        }
    : hov
      ? {
          background: "var(--code-bg)",
          color: "var(--text-h)",
          borderColor: "var(--border)",
        }
      : {
          background: "var(--bg)",
          color: "var(--text)",
          borderColor: "var(--border)",
        }

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
