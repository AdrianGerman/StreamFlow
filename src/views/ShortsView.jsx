import BucketView from "../components/BucketView"

const DESTINATIONS = [{ id: "trash", label: "Para borrar" }]

export default function ShortsView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
}) {
  return (
    <BucketView
      bucketId="shorts"
      title="Pool de shorts"
      sub="Extrae los mejores momentos y marca cada short a medida que lo subes."
      emptyText="Sin videos en el pool. Cuando termines de editar un video, muévelo aquí para extraer clips."
      vods={buckets.shorts ?? []}
      destinations={DESTINATIONS}
      onAdd={(data) => addVod("shorts", data)}
      onUpdate={updateVod}
      onMove={moveVod}
      onRemove={removeVod}
    />
  )
}
