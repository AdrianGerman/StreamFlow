import { useState } from "react"
import ViewHeader from "./ViewHeader"
import EmptyState from "./EmptyState"
import VodCard from "./VodCard"
import AddVodModal from "./AddVodModal"

export default function BucketView({
  bucketId,
  title,
  sub,
  emptyText,
  vods,
  destinations,
  canAdd = true,
  onAdd,
  onMove,
  onRemove,
  onAdvance = null,
  onRegress = null,
  children,
}) {
  const [showModal, setShowModal] = useState(false)

  const handleAdd = (data) => {
    onAdd(data)
    setShowModal(false)
  }

  return (
    <>
      <ViewHeader
        title={title}
        sub={sub}
        count={vods.length}
        onAdd={canAdd ? () => setShowModal(true) : null}
      />

      {children}

      {vods.length === 0 ? (
        <EmptyState
          text={emptyText}
          onAdd={canAdd ? () => setShowModal(true) : null}
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
              onAdvance={onAdvance}
              onRegress={onRegress}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddVodModal
          bucketLabel={title}
          onAdd={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
