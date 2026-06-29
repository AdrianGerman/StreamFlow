import { useState } from "react"
import VodCard from "../components/VodCard"
import AddVodModal from "../components/AddVodModal"
import { ViewHeader, EmptyState } from "./InboxView"

const DESTINATIONS = [
  { id: "editing", label: "Edición" },
  { id: "trash", label: "Para borrar" },
]

const FILTERS = [
  { id: "all", label: "Todas" },
  { id: "video", label: "Video largo" },
  { id: "short", label: "Short" },
  { id: "tiktok", label: "TikTok" },
]

export default function IdeasView({ buckets, addVod, moveVod, removeVod }) {
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const vods = buckets.ideas ?? []

  const filtered =
    filter === "all" ? vods : vods.filter((v) => v.tags?.includes(filter))

  return (
    <div className="p-5 max-w-2xl">
      <ViewHeader
        title="Ideas de contenido"
        sub="VODs con potencial para video largo, shorts o TikToks."
        count={vods.length}
        onAdd={() => setShowModal(true)}
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="text-[12px] font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-150"
            style={{
              background:
                filter === f.id ? "var(--sf-green)" : "var(--code-bg)",
              color: filter === f.id ? "#fff" : "var(--text)",
              borderColor: filter === f.id ? "transparent" : "var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          text={
            filter === "all"
              ? "Sin ideas todavía. Mové un VOD desde el inbox."
              : `Sin VODs con tag "${FILTERS.find((f) => f.id === filter)?.label}".`
          }
          onAdd={filter === "all" ? () => setShowModal(true) : null}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtered.map((vod) => (
            <VodCard
              key={vod.id}
              vod={vod}
              bucketId="ideas"
              destinations={DESTINATIONS}
              onMove={moveVod}
              onRemove={removeVod}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddVodModal
          bucketLabel="Ideas de contenido"
          onAdd={(data) => {
            addVod("ideas", data)
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
