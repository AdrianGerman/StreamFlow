import BucketView from "../components/BucketView"

export default function TrashView({ buckets, updateVod, removeVod }) {
  return (
    <BucketView
      bucketId="trash"
      title="Listo para borrar"
      sub="VODs con el ciclo completo. Puedes borrar los archivos originales para liberar espacio."
      emptyText="Sin VODs para borrar. Cuando un ciclo cierre completamente, el VOD llegará aquí."
      vods={buckets.trash ?? []}
      destinations={[]}
      canAdd={false}
      onAdd={null}
      onUpdate={updateVod}
      onMove={() => {}}
      onRemove={removeVod}
    >
      {(buckets.trash?.length ?? 0) > 0 && (
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg mb-4 text-[12px]"
          style={{
            background: "var(--sf-trash-bg)",
            color: "var(--sf-trash-text)",
          }}
        >
          <i className="ti ti-alert-triangle text-sm" aria-hidden="true" />
          Estos VODs ya fueron procesados. Puedes borrar los archivos originales
          de tu PC con seguridad.
        </div>
      )}
    </BucketView>
  )
}
