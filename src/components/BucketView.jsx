import { useState } from "react"
import ViewHeader from "./ViewHeader"
import EmptyState from "./EmptyState"
import VodCard from "./VodCard"
import VodModal from "./VodModal"
import SortControl from "./SortControl"
import { useSortedVods } from "../hooks/useSortedVods"

export default function BucketView({
  bucketId,
  title,
  sub,
  emptyText,
  vods,
  destinations,
  canAdd = true,
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
  const { sorted, sortId, setSortId } = useSortedVods(vods)

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

  return (
    <>
      <ViewHeader
        title={title}
        sub={sub}
        count={vods.length}
        onAdd={canAdd ? () => setShowCreate(true) : null}
      />

      {children}

      {vods.length > 1 && <SortControl sortId={sortId} onChange={setSortId} />}

      {vods.length === 0 ? (
        <EmptyState
          text={emptyText}
          onAdd={canAdd ? () => setShowCreate(true) : null}
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
