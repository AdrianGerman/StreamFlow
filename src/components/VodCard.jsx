import TagBadge from "./TagBadge"
import PhaseBar from "./PhaseBar"
import ShortsTracker from "./ShortsTracker"
import ActionBtn from "./ActionBtn"
import SourceOrigin from "./SourceOrigin"
import { CONTENT_TYPE_MAP } from "../constants/contentTypes"
import { formatDate } from "../utils/date"
import { useVodCardActions } from "../hooks/useVodCardActions"

export default function VodCard({
  vod,
  bucketId,
  destinations,
  onMove,
  onEdit,
  onAdvance,
  onRegress,
  onRemove,
  onUpdate,
}) {
  const {
    hovered,
    confirming,
    handleMouseEnter,
    handleMouseLeave,
    handleRemove,
    handleMove,
  } = useVodCardActions({ vod, bucketId, onMove, onRemove })

  const isEditing = bucketId === "editing"
  const isShorts = bucketId === "shorts"
  const isTrash = bucketId === "trash"
  const ct = CONTENT_TYPE_MAP[vod.contentType ?? "stream"]

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl transition-all duration-200"
      style={{
        background: "var(--bg)",
        border: `1px solid ${hovered ? "var(--border-strong)" : "var(--border)"}`,
        boxShadow: hovered ? "var(--shadow)" : "var(--shadow-sm)",
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 rounded-t-xl"
        style={{
          background: "var(--code-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
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

      <div className="px-4 py-3">
        <SourceOrigin vod={vod} />

        {vod.videoTitle && (
          <p
            className="text-[15px] font-semibold leading-snug"
            style={{ color: "var(--text-h)" }}
          >
            {vod.videoTitle}
          </p>
        )}

        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          {vod.duration && (
            <span className="text-[11px]" style={{ color: "var(--text)" }}>
              ⏱ {vod.duration}
            </span>
          )}
          {vod.playlist && (
            <span className="text-[11px]" style={{ color: "var(--text)" }}>
              📋 {vod.playlist}
            </span>
          )}
        </div>

        {vod.youtubeUrl && (
          <a
            href={vod.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium mt-1.5 transition-opacity hover:opacity-70"
            style={{ color: "var(--sf-primary)" }}
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

        {isShorts && onUpdate && (
          <ShortsTracker
            vod={vod}
            onUpdate={(changes) => onUpdate(bucketId, vod.id, changes)}
            onComplete={() => onMove(vod.id, bucketId, "trash")}
          />
        )}

        {hovered && !isTrash && (
          <VodCardActions
            destinations={destinations}
            onMove={handleMove}
            onEdit={onEdit ? () => onEdit(vod) : null}
            onRemove={handleRemove}
            confirming={confirming}
          />
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
    </div>
  )
}

function VodCardActions({
  destinations,
  onMove,
  onEdit,
  onRemove,
  confirming,
}) {
  return (
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
            <ActionBtn key={dest.id} onClick={() => onMove(dest.id)}>
              {dest.label} →
            </ActionBtn>
          ))}
        </>
      )}
      <div className="ml-auto flex gap-1.5">
        {onEdit && <ActionBtn onClick={onEdit}>✎ Editar</ActionBtn>}
        <ActionBtn onClick={onRemove} danger={confirming}>
          {confirming ? "¿Confirmar?" : "✕ Quitar"}
        </ActionBtn>
      </div>
    </div>
  )
}
