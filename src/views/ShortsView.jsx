import { useState } from "react"
import VodCard from "../components/VodCard"
import AddVodModal from "../components/AddVodModal"
import { ViewHeader, EmptyState } from "./InboxView"

const DESTINATIONS = [{ id: "trash", label: "Para borrar" }]

export default function ShortsView({ buckets, addVod, moveVod, removeVod }) {
  const [showModal, setShowModal] = useState(false)
  const vods = buckets.shorts ?? []

  return (
    <div className="p-5 max-w-2xl">
      <ViewHeader
        title="Pool de shorts"
        sub="Videos terminados. Extraé los mejores momentos para shorts y TikToks."
        count={vods.length}
        onAdd={() => setShowModal(true)}
      />

      {vods.length === 0 ? (
        <EmptyState text="Sin videos en el pool. Cuando terminés de editar un video, movelो acá para extraer clips." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {vods.map((vod) => (
            <VodCard
              key={vod.id}
              vod={vod}
              bucketId="shorts"
              destinations={DESTINATIONS}
              onMove={moveVod}
              onRemove={removeVod}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddVodModal
          bucketLabel="Pool de shorts"
          onAdd={(data) => {
            addVod("shorts", data)
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
