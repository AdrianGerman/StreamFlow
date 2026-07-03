import BucketView from "../components/BucketView"
import { TABS } from "../constants/nav"

const DESTINATIONS = TABS.filter(
  (t) => t.storeKey && t.storeKey !== "inbox",
).map((t) => ({ id: t.storeKey, label: t.label }))

export default function InboxView({ buckets, addVod, moveVod, removeVod }) {
  return (
    <BucketView
      bucketId="inbox"
      title="VODs sin clasificar"
      sub="Streams descargados que todavía no has clasificado."
      emptyText="No hay VODs sin clasificar. Agrega uno para empezar."
      vods={buckets.inbox ?? []}
      destinations={DESTINATIONS}
      onAdd={(data) => addVod("inbox", data)}
      onMove={moveVod}
      onRemove={removeVod}
    />
  )
}
