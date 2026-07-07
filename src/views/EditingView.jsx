import BucketView from "../components/BucketView"
import { PHASES, TOTAL_PHASES } from "../constants/phases"

const DESTINATIONS = [
  { id: "shorts", label: "Shorts" },
  { id: "trash", label: "Para borrar" },
]

export default function EditingView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  advancePhase,
  regressPhase,
  removeVod,
}) {
  return (
    <BucketView
      bucketId="editing"
      title="En edición"
      sub="Videos en proceso de edición. Avanza las fases a medida que editas."
      emptyText="Sin videos en edición. Mueve una idea cuando estés listo para editar."
      vods={buckets.editing ?? []}
      destinations={DESTINATIONS}
      onUpdate={updateVod}
      onAdd={(data) => addVod("editing", data)}
      onMove={moveVod}
      onRemove={removeVod}
      onAdvance={(vodId, phase) => advancePhase(vodId, phase, TOTAL_PHASES)}
      onRegress={regressPhase}
    >
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
    </BucketView>
  )
}
