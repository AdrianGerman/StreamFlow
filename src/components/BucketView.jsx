import { useState } from "react"
import ViewHeader from "./ViewHeader"
import EmptyState from "./EmptyState"
import VodCard from "./VodCard"
import VodModal from "./VodModal"
import SortControl from "./SortControl"
import SearchBar from "./SearchBar"
import { useSortedVods } from "../hooks/useSortedVods"
import { useSearchVods } from "../hooks/useSearchVods"

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
  onAdvance = null,
  onRegress = null,
  children,
}) {
  const [showCreate, setShowCreate] = useState(false)
  const [editingVod, setEditingVod] = useState(null)

  const { filtered, query, setQuery } = useSearchVods(vods)
  const { sorted, sortId, setSortId } = useSortedVods(filtered)

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
            <VodCard
              key={vod.id}
              vod={vod}
              bucketId={bucketId}
              destinations={destinations}
              onMove={onMove}
              onRemove={onRemove}
              onEdit={onUpdate ? handleEdit : null}
              onAdvance={onAdvance}
              onRegress={onRegress}
            />
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
