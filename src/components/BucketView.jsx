import { useState } from "react"
import ViewHeader from "./ViewHeader"
import EmptyState from "./EmptyState"
import VodCard from "./VodCard"
import VodModal from "./VodModal"

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
  const [editing, setEditing] = useState(null)

  const handleCreate = (data) => {
    onAdd(data)
    setShowCreate(false)
  }

  const handleUpdate = (data) => {
    if (!editing) return
    onUpdate(bucketId, editing.id, data)
    setEditing(null)
  }

  return (
    <>
      <ViewHeader
        title={title}
        sub={sub}
        count={vods.length}
        onAdd={canAdd ? () => setShowCreate(true) : null}
      />

      {children}

      {vods.length === 0 ? (
        <EmptyState
          text={emptyText}
          onAdd={canAdd ? () => setShowCreate(true) : null}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {vods.map((vod) => (
            <VodCard
              key={vod.id}
              vod={vod}
              bucketId={bucketId}
              destinations={destinations}
              onMove={onMove}
              onRemove={onRemove}
              onEdit={onUpdate ? () => setEditing(vod) : null}
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

      {editing && (
        <VodModal
          mode="edit"
          initialData={editing}
          onConfirm={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  )
}
