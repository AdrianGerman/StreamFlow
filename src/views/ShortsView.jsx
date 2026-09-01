import { useState } from "react"
import ViewHeader from "../components/ViewHeader"
import EmptyState from "../components/EmptyState"
import VodCard from "../components/VodCard"
import ShortModal from "../components/ShortModal"
import SearchBar from "../components/SearchBar"
import SortControl from "../components/SortControl"
import { useSortedVods } from "../hooks/useSortedVods"
import { useSearchVods } from "../hooks/useSearchVods"
import { useDragDrop } from "../hooks/useDragDrop"

const DESTINATIONS = [{ id: "trash", label: "Para borrar" }]

export default function ShortsView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
  reorderVods,
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [editingVod, setEditingVod] = useState(null)

  const vods = buckets.shorts ?? []
  const { filtered, query, setQuery } = useSearchVods(vods)
  const { sorted, sortId, setSortId } = useSortedVods(filtered, "shorts")

  const canDrag = !!reorderVods && !query && sortId === "date-desc"
  const { overId, onDragStart, onDragOver, onDrop, onDragEnd } = useDragDrop(
    (fromId, toId) => reorderVods("shorts", fromId, toId),
  )

  const handleAdd = (data) => {
    addVod("shorts", data)
    setShowCreate(false)
  }

  const handleUpdate = (data) => {
    if (!editingVod) return
    updateVod("shorts", editingVod.id, data)
    setEditingVod(null)
  }

  return (
    <>
      <ViewHeader
        title="Pool de shorts"
        sub="Extrae los mejores momentos y marca cada short a medida que lo subes."
        count={vods.length}
        onAdd={() => setShowCreate(true)}
      />

      {vods.length > 1 && (
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <SearchBar
              query={query}
              onChange={setQuery}
              total={vods.length}
              found={filtered.length}
            />
          </div>
          <SortControl sortId={sortId} onChange={setSortId} />
          {canDrag && (
            <span className="text-[11px]" style={{ color: "var(--text)" }}>
              ⠿ Arrastra para reordenar
            </span>
          )}
        </div>
      )}

      {sorted.length === 0 ? (
        <EmptyState
          text={
            query
              ? `Sin resultados para "${query}".`
              : "Sin videos en el pool. Agrega shorts directamente o mueve un video desde Edición."
          }
          onAdd={!query ? () => setShowCreate(true) : null}
          addLabel="Agregar shorts"
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {sorted.map((vod) => (
            <div
              key={vod.id}
              draggable={canDrag}
              onDragStart={canDrag ? onDragStart(vod.id) : undefined}
              onDragOver={canDrag ? onDragOver(vod.id) : undefined}
              onDrop={canDrag ? onDrop(vod.id) : undefined}
              onDragEnd={canDrag ? onDragEnd : undefined}
              style={{
                transition: "transform 0.15s",
                transform: overId === vod.id ? "translateY(-3px)" : "none",
                outline:
                  overId === vod.id ? "2px dashed var(--sf-primary)" : "none",
                outlineOffset: "2px",
                borderRadius: 12,
                cursor: canDrag ? "grab" : "default",
              }}
            >
              <VodCard
                vod={vod}
                bucketId="shorts"
                destinations={DESTINATIONS}
                onMove={moveVod}
                onRemove={removeVod}
                onUpdate={updateVod}
                onEdit={(v) => setEditingVod({ ...v })}
              />
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <ShortModal
          mode="create"
          onConfirm={handleAdd}
          onClose={() => setShowCreate(false)}
        />
      )}

      {editingVod && (
        <ShortModal
          mode="edit"
          initialData={editingVod}
          onConfirm={handleUpdate}
          onClose={() => setEditingVod(null)}
        />
      )}
    </>
  )
}
