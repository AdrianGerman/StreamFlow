import { useState } from "react"
import ActionBtn from "./ActionBtn"
import TagBadge from "./TagBadge"
import { CONTENT_TYPE_MAP } from "../constants/contentTypes"
import { formatDate } from "../utils/date"

export default function TrashCard({ vod, onRemove }) {
  const [hovered, setHovered] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const ct = CONTENT_TYPE_MAP[vod.contentType ?? "stream"]

  const handleRemove = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onRemove("trash", vod.id)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setConfirming(false)
      }}
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
          background: "var(--sf-trash-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--sf-trash-text)" }}
        >
          {ct?.icon} {ct?.label} · Ciclo completado
        </span>
        {vod.completedAt && (
          <span
            className="text-[11px]"
            style={{ color: "var(--sf-trash-text)" }}
          >
            {formatDate(vod.completedAt)}
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        <p
          className="text-[11px] leading-snug mb-0.5"
          style={{ color: "var(--text)" }}
        >
          {vod.title}
        </p>

        {vod.videoTitle && (
          <p
            className="text-[14px] font-semibold leading-snug"
            style={{ color: "var(--text-h)" }}
          >
            {vod.videoTitle}
          </p>
        )}

        <div className="flex items-center gap-4 mt-2 flex-wrap">
          {vod.duration && (
            <CycleStat icon="⏱" label="Duración" value={vod.duration} />
          )}
          {vod.shortsCount > 0 && (
            <CycleStat
              icon="📱"
              label="Shorts"
              value={`${vod.shortsPosted ?? 0}/${vod.shortsCount} subidos`}
              highlight={(vod.shortsPosted ?? 0) >= vod.shortsCount}
            />
          )}
          {vod.date && (
            <CycleStat icon="📅" label="Grabado" value={formatDate(vod.date)} />
          )}
          {vod.playlist && (
            <CycleStat icon="📋" label="Playlist" value={vod.playlist} />
          )}
        </div>

        {vod.tags?.length > 0 && (
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {vod.tags.map((t) => (
              <TagBadge key={t} tagId={t} />
            ))}
          </div>
        )}

        {vod.notes && (
          <p
            className="text-[12px] leading-relaxed mt-2 px-3 py-2 rounded-lg"
            style={{ color: "var(--text)", background: "var(--code-bg)" }}
          >
            {vod.notes}
          </p>
        )}

        {hovered && (
          <div
            className="mt-3 pt-2.5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <ActionBtn onClick={handleRemove} danger={confirming} fullWidth>
              {confirming
                ? "¿Confirmar eliminación?"
                : "🗑 Eliminar de StreamFlow"}
            </ActionBtn>
          </div>
        )}
      </div>
    </div>
  )
}

function CycleStat({ icon, label, value, highlight }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[11px]">{icon}</span>
      <span className="text-[11px]" style={{ color: "var(--text)" }}>
        {label}:
      </span>
      <span
        className="text-[11px] font-semibold"
        style={{ color: highlight ? "var(--sf-primary)" : "var(--text-h)" }}
      >
        {value}
      </span>
    </div>
  )
}
