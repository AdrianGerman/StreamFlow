import { useState } from "react"
import VodCard from "../components/VodCard"
import AddVodModal from "../components/AddVodModal"
import { TABS } from "../constants/nav"

const DESTINATIONS = TABS.filter(
  (t) => t.storeKey && t.storeKey !== "inbox",
).map((t) => ({
  id: t.storeKey,
  label: t.label,
}))

export default function InboxView({ buckets, addVod, moveVod, removeVod }) {
  const [showModal, setShowModal] = useState(false)
  const vods = buckets.inbox ?? []

  return (
    <div className="p-5 max-w-2xl">
      <ViewHeader
        title="VODs sin clasificar"
        sub="Streams descargados que todavía no clasificaste."
        count={vods.length}
        onAdd={() => setShowModal(true)}
      />

      {vods.length === 0 ? (
        <EmptyState
          text="No hay VODs sin clasificar. ¡Agregá uno para empezar!"
          onAdd={() => setShowModal(true)}
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {vods.map((vod) => (
            <VodCard
              key={vod.id}
              vod={vod}
              bucketId="inbox"
              destinations={DESTINATIONS}
              onMove={moveVod}
              onRemove={removeVod}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddVodModal
          bucketLabel="VODs sin clasificar"
          onAdd={(data) => {
            addVod("inbox", data)
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export function ViewHeader({ title, sub, count, onAdd }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h1
          className="text-lg font-medium mb-0.5"
          style={{ color: "var(--text-h)" }}
        >
          {title}
          {count > 0 && (
            <span
              className="ml-2 text-[12px] font-semibold px-2 py-0.5 rounded-full align-middle"
              style={{ background: "var(--code-bg)", color: "var(--text)" }}
            >
              {count}
            </span>
          )}
        </h1>
        {sub && (
          <p className="text-[13px]" style={{ color: "var(--text)" }}>
            {sub}
          </p>
        )}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg border-none cursor-pointer text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--sf-green)" }}
        >
          <i className="ti ti-plus text-sm" aria-hidden="true" /> Agregar
        </button>
      )}
    </div>
  )
}

export function EmptyState({ text, onAdd }) {
  return (
    <div
      className="rounded-xl border border-dashed p-10 text-center"
      style={{ borderColor: "var(--border)" }}
    >
      <p className="text-[13px] mb-3" style={{ color: "var(--text)" }}>
        {text}
      </p>
      {onAdd && (
        <button
          onClick={onAdd}
          className="text-[13px] font-medium px-4 py-2 rounded-lg cursor-pointer border-none text-white"
          style={{ background: "var(--sf-green)" }}
        >
          + Agregar VOD
        </button>
      )}
    </div>
  )
}
