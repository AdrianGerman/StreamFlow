import { useState } from "react"
import ViewHeader from "./ViewHeader"
import EmptyState from "./EmptyState"
import VodCard from "./VodCard"
import VodModal from "./VodModal"
import SortControl from "./SortControl"
import SearchBar from "./SearchBar"
import { useSortedVods } from "../hooks/useSortedVods"
import { useSearchVods } from "../hooks/useSearchVods"
import { useDragDrop } from "../hooks/useDragDrop"

export default function BucketView({
  bucketId,
  title,
  sub,
  emptyText,
  vods,
  destinations,
  canAdd = true,
  defaultContentType = "stream",
  onAdd,
  onUpdate = null,
  onMove,
  onRemove,
  onReorder = null,
  onAdvance = null,
  onRegress = null,
  children,
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [editingVod, setEditingVod] = useState(null)

  const { filtered, query, setQuery } = useSearchVods(vods)
  const { sorted, sortId, setSortId } = useSortedVods(filtered)

  const canDrag = !!onReorder && !query && sortId === "date-desc"

  const { overId, onDragStart, onDragOver, onDrop, onDragEnd } = useDragDrop(
    (fromId, toId) => onReorder(bucketId, fromId, toId),
  )

  const handleCreate = (data) => {
    onAdd(data)
    setShowCreate(false)
  }
  const handleUpdate = (data) => {
    if (!editingVod || !onUpdate) return
    onUpdate(bucketId, editingVod.id, data)
    setEditingVod(null)
  }
  const handleEdit = (vod) => setEditingVod({ ...vod })

  const showControls = vods.length > 1

  return (
    <>
      <ViewHeader
        title={title}
        sub={sub}
        count={vods.length}
        onAdd={canAdd ? () => setShowCreate(true) : null}
      />

      {children}

      {showControls && (
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
          text={query ? `Sin resultados para "${query}".` : emptyText}
          onAdd={!query && canAdd ? () => setShowCreate(true) : null}
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
                transition: "transform 0.15s, opacity 0.15s",
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
                bucketId={bucketId}
                destinations={destinations}
                onMove={onMove}
                onRemove={onRemove}
                onEdit={onUpdate ? handleEdit : null}
                onUpdate={onUpdate}
                onAdvance={onAdvance}
                onRegress={onRegress}
              />
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <VodModal
          mode="create"
          bucketLabel={title}
          defaultContentType={defaultContentType}
          onConfirm={handleCreate}
          onClose={() => setShowCreate(false)}
        />
      )}

      {editingVod && (
        <VodModal
          mode="edit"
          initialData={editingVod}
          onConfirm={handleUpdate}
          onClose={() => setEditingVod(null)}
        />
      )}
    </>
  )
}
