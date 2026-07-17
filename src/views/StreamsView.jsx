import BucketView from "../components/BucketView"
import { TABS } from "../constants/nav"

const DESTINATIONS = TABS.filter(
  (t) => t.storeKey && t.storeKey !== "inbox",
).map((t) => ({ id: t.storeKey, label: t.label }))

export default function StreamsView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
}) {
  const vods = (buckets.inbox ?? []).filter(
    (v) => (v.contentType ?? "stream") === "stream",
  )

  return (
    <BucketView
      bucketId="inbox"
      title="Streams"
      sub="VODs de streams en vivo descargados y pendientes de clasificar."
      emptyText="No hay streams sin clasificar. Agrega uno para empezar."
      vods={vods}
      destinations={DESTINATIONS}
      defaultContentType="stream"
      onAdd={(data) => addVod("inbox", { ...data, contentType: "stream" })}
      onUpdate={updateVod}
      onMove={moveVod}
      onRemove={removeVod}
    />
  )
}
