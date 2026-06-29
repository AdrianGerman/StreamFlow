import { useState } from "react"
import VodCard from "../components/VodCard"
import AddVodModal from "../components/AddVodModal"
import { ViewHeader, EmptyState } from "./InboxView"
import { PHASES, TOTAL_PHASES } from "../constants/phases"

const DESTINATIONS = [
  { id: "shorts", label: "Shorts" },
  { id: "trash", label: "Para borrar" },
]

export default function EditingView({
  buckets,
  addVod,
  moveVod,
  advancePhase,
  regressPhase,
  removeVod,
}) {
  const [showModal, setShowModal] = useState(false)
  const vods = buckets.editing ?? []

  return (
    <div className="p-5 max-w-2xl">
      <ViewHeader
        title="En edición"
        sub="Videos activamente en proceso. Avanzá las fases a medida que editás."
        count={vods.length}
        onAdd={() => setShowModal(true)}
      />

      <div className="flex gap-2 mb-5 flex-wrap">
        {PHASES.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border"
            style={{
              background: "var(--code-bg)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <span
              className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
              style={{ background: "var(--sf-green)" }}
            >
              {p.id}
            </span>
            {p.label}
          </div>
        ))}
      </div>

      {vods.length === 0 ? (
        <EmptyState
          text="Sin videos en edición. Mové una idea cuando estés listo para editar."
          onAdd={() => setShowModal(true)}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {vods.map((vod) => (
            <VodCard
              key={vod.id}
              vod={vod}
              bucketId="editing"
              destinations={DESTINATIONS}
              onMove={moveVod}
              onRemove={removeVod}
              onAdvance={(vodId, phase) =>
                advancePhase(vodId, phase, TOTAL_PHASES)
              }
              onRegress={regressPhase}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddVodModal
          bucketLabel="Edición"
          onAdd={(data) => {
            addVod("editing", data)
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
