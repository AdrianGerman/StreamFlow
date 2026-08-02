import { useState } from "react"
import ViewHeader from "../components/ViewHeader"
import EmptyState from "../components/EmptyState"
import IdeaCard from "../components/IdeaCard"
import IdeaModal from "../components/IdeaModal"
import { useSearchVods } from "../hooks/useSearchVods"

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
  const [showModal, setShowModal] = useState(false)
  const [editingIdea, setEditingIdea] = useState(null)
  const [filter, setFilter] = useState("all")

  const all = buckets.ideas ?? []
  const filtered =
    filter === "all" ? all : all.filter((v) => v.tags?.includes(filter))
  const { filtered: searched, query, setQuery } = useSearchVods(filtered)

  const handleCreate = (data) => {
    addVod("ideas", data)
    setShowModal(false)
  }

  const handleUpdate = (data) => {
    if (!editingIdea) return
    updateVod("ideas", editingIdea.id, data)
    setEditingIdea(null)
  }

  return (
    <>
      <ViewHeader
        title="Ideas de contenido"
        sub="Plasma tus ideas antes de llevarlas al flujo de edición."
        count={all.length}
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
                filter === f.id ? "var(--sf-primary)" : "var(--code-bg)",
              color: filter === f.id ? "#fff" : "var(--text)",
              borderColor: filter === f.id ? "transparent" : "var(--border)",
            }}
          >
            {f.label}
          </button>
        ))}

        {all.length > 1 && (
          <div className="relative ml-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar idea..."
              className="text-[12px] rounded-full border outline-none pl-3 pr-7 py-1.5 transition-colors duration-150"
              style={{
                background: "var(--code-bg)",
                borderColor: query ? "var(--accent-border)" : "var(--border)",
                color: "var(--text-h)",
                width: 160,
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] cursor-pointer border-none bg-transparent"
                style={{ color: "var(--text)" }}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {searched.length === 0 ? (
        <EmptyState
          text={
            query
              ? `Sin resultados para "${query}".`
              : filter !== "all"
                ? `Sin ideas de tipo "${FILTERS.find((f) => f.id === filter)?.label}".`
                : "Sin ideas todavía. Agrega una para empezar."
          }
          onAdd={!query && filter === "all" ? () => setShowModal(true) : null}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {searched.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onEdit={(idea) => setEditingIdea({ ...idea })}
              onMove={moveVod}
              onRemove={removeVod}
            />
          ))}
        </div>
      )}

      {showModal && (
        <IdeaModal
          mode="create"
          onConfirm={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}

      {editingIdea && (
        <IdeaModal
          mode="edit"
          initialData={editingIdea}
          onConfirm={handleUpdate}
          onClose={() => setEditingIdea(null)}
        />
      )}
    </>
  )
}
