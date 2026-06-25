import { useState } from "react"
import TagBadge from "./TagBadge"
import PhaseBar from "./PhaseBar"

export default function VodCard({
  vod,
  columnId,
  onMove,
  onAdvance,
  onRegress,
  onRemove,
  availableColumns,
}) {
  const [hovered, setHovered] = useState(false)

  const isEditing = columnId === "editing"
  const isTrash = columnId === "trash"

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-xl px-3 py-2.5 transition-all duration-150 cursor-default"
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
        <div className="flex gap-2.5 mt-1.5 flex-wrap">
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
        <div className="flex gap-1 mt-2 flex-wrap">
          {vod.tags.map((t) => (
            <TagBadge key={t} tagId={t} />
          ))}
        </div>
      )}

      {isEditing && (
        <PhaseBar
          phase={vod.phase}
          onAdvance={() => onAdvance(vod.id, vod.phase)}
          onRegress={() => onRegress(vod.id, vod.phase)}
        />
      )}

      {hovered && !isTrash && (
        <div className="flex gap-1.5 flex-wrap mt-2.5">
          {availableColumns
            .filter((col) => col.id !== columnId)
            .map((col) => (
              <MoveBtn
                key={col.id}
                label={col.label}
                onClick={() => onMove(vod.id, columnId, col.id)}
              />
            ))}
          <RemoveBtn onClick={() => onRemove(columnId, vod.id)} />
        </div>
      )}

      {hovered && isTrash && (
        <button
          onClick={() => onRemove(columnId, vod.id)}
          className="mt-2.5 w-full text-[11px] font-semibold py-1 rounded-md cursor-pointer border transition-colors duration-150 bg-[#fdf0ee] text-[#c0392b] border-[#c0392b22] hover:bg-[#fce0dc]"
        >
          Eliminar de StreamFlow
        </button>
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
      className="text-[10px] font-medium px-2 py-0.5 rounded-md border cursor-pointer transition-colors duration-100 whitespace-nowrap hover:bg-[#f0f0ec]"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-h)",
        background: "var(--bg)",
      }}
    >
      → {label}
    </button>
  )
}

function RemoveBtn({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-[10px] font-medium px-2 py-0.5 rounded-md border cursor-pointer transition-colors duration-100 hover:bg-[#fdf0ee] hover:text-[#c0392b] hover:border-[#c0392b44]"
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
