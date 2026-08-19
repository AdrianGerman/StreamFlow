import { useState } from "react"
import ViewHeader from "../components/ViewHeader"
import EmptyState from "../components/EmptyState"
import IdeaCard from "../components/IdeaCard"
import IdeaModal from "../components/IdeaModal"
import { useSearchVods } from "../hooks/useSearchVods"

const TAG_FILTERS = [
  { id: "all", label: "Todas" },
  { id: "video", label: "Video largo" },
  { id: "short", label: "Short" },
  { id: "tiktok", label: "TikTok" },
]

const TYPE_FILTERS = [
  { id: "all", label: "Todo" },
  { id: "stream", label: "🎮 Streams" },
  { id: "recording", label: "🎥 Grabaciones" },
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
  const [tagFilter, setTagFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const all = buckets.ideas ?? []

  const filtered = all
    .filter((v) => tagFilter === "all" || v.tags?.includes(tagFilter))
    .filter(
      (v) => typeFilter === "all" || (v.contentType ?? "stream") === typeFilter,
    )

  const { filtered: searched, query, setQuery } = useSearchVods(filtered)

  const handleCreate = (data) => {
    addVod("ideas", {
      ...data,
      title: data.videoTitle || data.title || "Sin título",
    })
    setShowModal(false)
  }

  const handleUpdate = (data) => {
    if (!editingIdea) return
    updateVod("ideas", editingIdea.id, {
      ...data,
      title: data.videoTitle || data.title || "Sin título",
    })
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

      <div
        className="flex gap-1 mb-3 p-1 rounded-xl w-fit"
        style={{ background: "var(--code-bg)" }}
      >
        {TYPE_FILTERS.map((f) => {
          const count =
            f.id === "all"
              ? all.length
              : all.filter((v) => (v.contentType ?? "stream") === f.id).length
          const isActive = typeFilter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer border-none transition-all duration-150"
              style={{
                background: isActive ? "var(--bg)" : "transparent",
                color: isActive ? "var(--sf-primary)" : "var(--text)",
                boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f.label}
              {count > 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive
                      ? "var(--sf-primary)"
                      : "var(--border)",
                    color: isActive ? "#fff" : "var(--text)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex gap-2 mb-4 flex-wrap items-center">
        {TAG_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setTagFilter(f.id)}
            className="text-[12px] font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all duration-150"
            style={{
              background:
                tagFilter === f.id ? "var(--sf-primary)" : "var(--code-bg)",
              color: tagFilter === f.id ? "#fff" : "var(--text)",
              borderColor: tagFilter === f.id ? "transparent" : "var(--border)",
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
              : tagFilter !== "all" || typeFilter !== "all"
                ? "Sin ideas con ese filtro."
                : "Sin ideas todavía. Agrega una para empezar."
          }
          onAdd={
            !query && tagFilter === "all" && typeFilter === "all"
              ? () => setShowModal(true)
              : null
          }
          addLabel="Agregar idea"
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
