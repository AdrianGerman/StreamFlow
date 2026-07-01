import VodCard from "../components/VodCard"
import { ViewHeader, EmptyState } from "./InboxView"

export default function TrashView({ buckets, removeVod }) {
  const vods = buckets.trash ?? []

  return (
    <div className="contents">
      <ViewHeader
        title="Listo para borrar"
        sub="VODs con el ciclo completo. Borra los archivos originales para liberar espacio."
        count={vods.length}
      />

      {vods.length === 0 ? (
        <EmptyState text="Sin VODs para borrar. Cuando un ciclo cierre completamente, el VOD llegará acá." />
      ) : (
        <>
          <div
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg mb-4 text-[12px]"
            style={{ background: "#fae0d4", color: "#5c2010" }}
          >
            <i className="ti ti-alert-triangle text-sm" aria-hidden="true" />
            Estos VODs ya fueron procesados. Podes borrar los archivos
            originales de tu PC con seguridad.
          </div>
          <div className="flex flex-col gap-2.5">
            {vods.map((vod) => (
              <VodCard
                key={vod.id}
                vod={vod}
                bucketId="trash"
                destinations={[]}
                onMove={() => {}}
                onRemove={removeVod}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
