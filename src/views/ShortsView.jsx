import BucketView from "../components/BucketView"

const DESTINATIONS = [{ id: "trash", label: "Para borrar" }]

export default function ShortsView({ buckets, addVod, moveVod, removeVod }) {
  return (
    <BucketView
      bucketId="shorts"
      title="Pool de shorts"
      sub="Videos terminados. Extrae los mejores momentos para shorts y TikToks."
      emptyText="Sin videos en el pool. Cuando termines de editar un video, muévelo aquí para extraer clips."
      vods={buckets.shorts ?? []}
      destinations={DESTINATIONS}
      onAdd={(data) => addVod("shorts", data)}
      onMove={moveVod}
      onRemove={removeVod}
    />
  )
}
