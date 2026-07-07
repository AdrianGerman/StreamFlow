import { useState } from "react"
import BucketView from "../components/BucketView"

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

export default function IdeasView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
}) {
  const [filter, setFilter] = useState("all")
  const vods = buckets.ideas ?? []

  const filtered =
    filter === "all" ? vods : vods.filter((v) => v.tags?.includes(filter))

  const activeFilter = FILTERS.find((f) => f.id === filter)

  return (
    <BucketView
      bucketId="ideas"
      title="Ideas de contenido"
      sub="VODs con potencial para video largo, shorts o TikToks."
      emptyText={
        filter === "all"
          ? "Sin ideas todavía. Mueve un VOD desde el inbox."
          : `Sin VODs con el tipo "${activeFilter?.label}".`
      }
      vods={filtered}
      destinations={DESTINATIONS}
      onUpdate={updateVod}
      onAdd={(data) => addVod("ideas", data)}
      onMove={moveVod}
      onRemove={removeVod}
    >
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
    </BucketView>
  )
}
