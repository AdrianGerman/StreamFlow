import BucketView from "../components/BucketView"
import { TABS } from "../constants/nav"

const DESTINATIONS = TABS.filter(
  (t) => t.storeKey && t.storeKey !== "inbox",
).map((t) => ({ id: t.storeKey, label: t.label }))

export default function RecordingsView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
}) {
  const vods = (buckets.inbox ?? []).filter(
    (v) => v.contentType === "recording",
  )

  return (
    <BucketView
      bucketId="inbox"
      title="Grabaciones"
      sub="Videos grabados offline pendientes de organizar y editar."
      emptyText="No hay grabaciones pendientes. Agrega una para empezar."
      vods={vods}
      destinations={DESTINATIONS}
      defaultContentType="recording"
      onAdd={(data) => addVod("inbox", { ...data, contentType: "recording" })}
      onUpdate={updateVod}
      onMove={moveVod}
      onRemove={removeVod}
    />
  )
}
