import { useMemo } from "react"
import ViewHeader from "../components/ViewHeader"
import EmptyState from "../components/EmptyState"
import TrashCard from "../components/TrashCard"

export default function TrashView({ buckets, removeVod }) {
  const vods = buckets.trash ?? []

  const stats = useMemo(
    () => ({
      total: vods.length,
      shortsTotal: vods.reduce((acc, v) => acc + (v.shortsCount ?? 0), 0),
      shortsPosted: vods.reduce((acc, v) => acc + (v.shortsPosted ?? 0), 0),
    }),
    [vods],
  )

  return (
    <>
      <ViewHeader
        title="Listo para borrar"
        sub="VODs con el ciclo completo. Puedes borrar los archivos originales para liberar espacio."
        count={vods.length}
      />

      {vods.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-5">
            <SummaryCard
              icon="✅"
              label="Ciclos completados"
              value={stats.total}
            />
            <SummaryCard
              icon="📱"
              label="Shorts generados"
              value={stats.shortsTotal}
            />
            <SummaryCard
              icon="⬆️"
              label="Shorts subidos"
              value={stats.shortsPosted}
            />
          </div>

          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-[12px] font-medium"
            style={{
              background: "var(--sf-trash-bg)",
              color: "var(--sf-trash-text)",
            }}
          >
            ⚠️ Estos VODs ya fueron procesados completamente. Puedes borrar los
            archivos originales de tu PC con seguridad.
          </div>

          <div className="flex flex-col gap-2.5">
            {vods.map((vod) => (
              <TrashCard key={vod.id} vod={vod} onRemove={removeVod} />
            ))}
          </div>
        </>
      )}

      {vods.length === 0 && (
        <EmptyState text="Sin VODs para borrar. Cuando un ciclo cierre completamente, el VOD llegará aquí." />
      )}
    </>
  )
}

function SummaryCard({ icon, label, value }) {
  return (
    <div
      className="rounded-xl p-3.5 border text-center"
      style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
    >
      <p className="text-xl mb-1">{icon}</p>
      <p
        className="text-2xl font-semibold mb-0.5"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
      <p className="text-[11px]" style={{ color: "var(--text)" }}>
        {label}
      </p>
    </div>
  )
}
