import { useState } from "react"
import TagBadge from "./TagBadge"
import PhaseBar from "./PhaseBar"

export default function VodCard({
  vod,
  bucketId,
  destinations,
  onMove,
  onAdvance,
  onRegress,
  onRemove,
}) {
  const [hovered, setHovered] = useState(false)

  const isEditing = bucketId === "editing"
  const isTrash = bucketId === "trash"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl px-3.5 py-3 transition-all duration-150"
      style={{
        background: "var(--bg)",
        border: `1px solid ${hovered ? "var(--border)" : "transparent"}`,
        boxShadow: hovered ? "var(--shadow)" : "0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      <p
        className="text-[13px] font-medium leading-snug m-0"
        style={{ color: "var(--text-h)" }}
      >
        {vod.title}
      </p>

      {(vod.duration || vod.date) && (
        <div className="flex gap-3 mt-1.5 flex-wrap">
          {vod.duration && <MetaChip icon="⏱" text={vod.duration} />}
          {vod.date && <MetaChip icon="📅" text={formatDate(vod.date)} />}
        </div>
      )}

      {vod.notes && (
        <p
          className="text-[11px] leading-relaxed mt-1.5 m-0"
          style={{ color: "var(--text)" }}
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

      {hovered && !isTrash && destinations.length > 0 && (
        <div
          className="flex gap-1.5 flex-wrap mt-3 pt-2.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="text-[10px] self-center mr-1"
            style={{ color: "var(--text)" }}
          >
            Mover a:
          </span>
          {destinations.map((dest) => (
            <MoveBtn
              key={dest.id}
              label={dest.label}
              onClick={() => onMove(vod.id, bucketId, dest.id)}
            />
          ))}
          <div className="ml-auto">
            <RemoveBtn onClick={() => onRemove(bucketId, vod.id)} />
          </div>
        </div>
      )}

      {isTrash && hovered && (
        <div
          className="mt-2.5 pt-2.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => onRemove(bucketId, vod.id)}
            className="w-full text-[11px] font-semibold py-1.5 rounded-lg cursor-pointer border transition-colors duration-150 hover:opacity-80"
            style={{
              background: "#fdf0ee",
              color: "#c0392b",
              borderColor: "#c0392b22",
            }}
          >
            Eliminar de StreamFlow
          </button>
        </div>
      )}
    </div>
  )
}

function MetaChip({ icon, text }) {
  return (
    <span
      className="flex items-center gap-1 text-[11px]"
      style={{ color: "var(--text)" }}
    >
      <span className="text-[10px]">{icon}</span>
      {text}
    </span>
  )
}

function MoveBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-colors duration-100 hover:bg-(--code-bg)"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-h)",
        background: "var(--bg)",
      }}
    >
      {label} →
    </button>
  )
}

function RemoveBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-colors duration-100 hover:bg-[#fdf0ee] hover:text-[#c0392b] hover:border-[#c0392b44]"
      style={{
        borderColor: "var(--border)",
        color: "var(--text)",
        background: "var(--bg)",
      }}
    >
      ✕ Quitar
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
