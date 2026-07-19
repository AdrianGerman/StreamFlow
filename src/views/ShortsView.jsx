import { useState } from "react"
import ViewHeader from "../components/ViewHeader"
import EmptyState from "../components/EmptyState"
import VodCard from "../components/VodCard"
import ShortsTracker from "../components/ShortsTracker"
import VodModal from "../components/VodModal"

const DESTINATIONS = [{ id: "trash", label: "Para borrar" }]

export default function ShortsView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
}) {
  const [showCreate, setShowCreate] = useState(false)
  const vods = buckets.shorts ?? []

  const handleComplete = (vodId) => {
    moveVod(vodId, "shorts", "trash")
  }

  return (
    <>
      <ViewHeader
        title="Pool de shorts"
        sub="Extrae los mejores momentos y marca cada short a medida que lo subes."
        count={vods.length}
        onAdd={() => setShowCreate(true)}
      />

      {vods.length === 0 ? (
        <EmptyState text="Sin videos en el pool. Cuando termines de editar un video, muévelo aquí para extraer clips." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {vods.map((vod) => (
            <ShortsCard
              key={vod.id}
              vod={vod}
              onUpdate={(changes) => updateVod("shorts", vod.id, changes)}
              onComplete={() => handleComplete(vod.id)}
              onMove={(vodId, from, to) => moveVod(vodId, from, to)}
              onRemove={removeVod}
              onEdit={(changes) => updateVod("shorts", vod.id, changes)}
            />
          ))}
        </div>
      )}

      {showCreate && (
        <VodModal
          mode="create"
          bucketLabel="Pool de shorts"
          onConfirm={(data) => {
            addVod("shorts", data)
            setShowCreate(false)
          }}
          onClose={() => setShowCreate(false)}
        />
      )}
    </>
  )
}

function ShortsCard({ vod, onUpdate, onComplete, onMove, onRemove }) {
  const [hovered, setHovered] = useState(false)
  const [confirming, setConfirming] = useState(false)

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
        border: "1px solid var(--border)",
        boxShadow: hovered ? "var(--shadow)" : "none",
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <div className="min-w-0">
          {vod.videoTitle && (
            <p
              className="text-[14px] font-semibold leading-snug"
              style={{ color: "var(--text-h)" }}
            >
              {vod.videoTitle}
            </p>
          )}
          <p className="text-[11px] mt-0.5" style={{ color: "var(--text)" }}>
            {vod.title}
          </p>
        </div>
        {vod.date && (
          <span
            className="text-[11px] shrink-0"
            style={{ color: "var(--text)" }}
          >
            {formatDate(vod.date)}
          </span>
        )}
      </div>

      {vod.notes && (
        <p
          className="text-[12px] leading-relaxed mt-2 px-3 py-2 rounded-lg"
          style={{ color: "var(--text)", background: "var(--code-bg)" }}
        >
          {vod.notes}
        </p>
      )}

      <ShortsTracker vod={vod} onUpdate={onUpdate} onComplete={onComplete} />

      {hovered && (
        <div
          className="flex items-center gap-1.5 flex-wrap mt-3 pt-2.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => onMove(vod.id, "shorts", "trash")}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-colors duration-150 hover:bg-(--code-bg)"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-h)",
              background: "var(--bg)",
            }}
          >
            Para borrar →
          </button>
          <div className="ml-auto">
            <button
              onClick={() => {
                if (!confirming) {
                  setConfirming(true)
                  return
                }
                onRemove("shorts", vod.id)
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-all duration-150"
              style={
                confirming
                  ? {
                      background: "var(--danger)",
                      color: "#fff",
                      borderColor: "transparent",
                    }
                  : {
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      background: "var(--bg)",
                    }
              }
            >
              {confirming ? "¿Confirmar?" : "✕ Quitar"}
            </button>
          </div>
        </div>
      )}
    </div>
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
