import { useState } from "react"
import TagBadge from "./TagBadge"
import ActionBtn from "./ActionBtn"
import { CONTENT_TYPE_MAP } from "../constants/contentTypes"
import { formatDate } from "../utils/date"
import { normalizeSources } from "../utils/ideaSources"

export default function IdeaCard({ idea, onEdit, onMove, onRemove }) {
  const [hovered, setHovered] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const ct = CONTENT_TYPE_MAP[idea.contentType ?? "stream"]
  const sources = normalizeSources(idea)

  const handleRemove = () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    onRemove("ideas", idea.id)
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
        className="flex items-center justify-between px-4 py-2 rounded-t-xl gap-2"
        style={{
          background: "var(--sf-ideas-bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <span
          className="text-[11px] font-semibold"
          style={{ color: "var(--sf-ideas-text)" }}
        >
          {ct?.icon} {ct?.label}
        </span>
        {idea.date && (
          <span
            className="text-[11px] shrink-0"
            style={{ color: "var(--sf-ideas-text)" }}
          >
            {formatDate(idea.date)}
          </span>
        )}
      </div>

      <div className="px-4 py-3">
        <p
          className="text-[15px] font-semibold leading-snug mb-3"
          style={{ color: "var(--text-h)" }}
        >
          {idea.videoTitle || idea.title}
        </p>

        {sources.some((s) => s.vodRef || s.moments?.length > 0) && (
          <div className="flex flex-col gap-2 mb-2.5">
            {sources.map((source, si) => {
              const hasContent =
                source.vodRef || source.moments?.filter(Boolean).length > 0
              if (!hasContent) return null
              return (
                <div
                  key={source.id}
                  className="rounded-lg px-3 py-2"
                  style={{ background: "var(--code-bg)" }}
                >
                  {source.vodRef && (
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className="text-[10px] font-bold uppercase tracking-wide"
                        style={{ color: "var(--text)" }}
                      >
                        {sources.length > 1 ? `VOD ${si + 1}` : "VOD"}
                      </span>
                      <span
                        className="text-[12px] font-medium"
                        style={{ color: "var(--text-h)" }}
                      >
                        📹 {source.vodRef}
                      </span>
                    </div>
                  )}

                  {source.moments?.filter(Boolean).length > 0 && (
                    <ul className="flex flex-col gap-0.5">
                      {source.moments.filter(Boolean).map((m, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-[12px]"
                          style={{ color: "var(--text)" }}
                        >
                          <span
                            className="shrink-0 mt-0.5"
                            style={{ color: "var(--sf-primary)" }}
                          >
                            ▸
                          </span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {idea.notes && (
          <p
            className="text-[12px] leading-relaxed mb-2.5 px-3 py-2 rounded-lg"
            style={{ color: "var(--text)", background: "var(--code-bg)" }}
          >
            {idea.notes}
          </p>
        )}

        {idea.tags?.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-1">
            {idea.tags.map((t) => (
              <TagBadge key={t} tagId={t} />
            ))}
          </div>
        )}

        {hovered && (
          <div
            className="flex items-center gap-1.5 flex-wrap mt-3 pt-2.5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <ActionBtn onClick={() => onMove(idea.id, "ideas", "editing")}>
              Mover a Edición →
            </ActionBtn>
            <ActionBtn onClick={() => onMove(idea.id, "ideas", "trash")}>
              Descartar →
            </ActionBtn>
            <div className="ml-auto flex gap-1.5">
              <ActionBtn onClick={() => onEdit(idea)}>✎ Editar</ActionBtn>
              <ActionBtn onClick={handleRemove} danger={confirming}>
                {confirming ? "¿Confirmar?" : "✕ Quitar"}
              </ActionBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
