import { useState } from "react"
import BucketView from "../components/BucketView"
import { TABS } from "../constants/nav"

const DESTINATIONS = TABS.filter(
  (t) => t.storeKey && t.storeKey !== "inbox",
).map((t) => ({ id: t.storeKey, label: t.label }))

const CONTENT_TABS = [
  { id: "stream", label: "Streams", icon: "🎮" },
  { id: "recording", label: "Grabaciones", icon: "🎥" },
]

export default function ContentView({
  buckets,
  addVod,
  updateVod,
  moveVod,
  removeVod,
  reorderVods,
}) {
  const [activeType, setActiveType] = useState("stream")

  const all = buckets.inbox ?? []
  const streams = all.filter((v) => (v.contentType ?? "stream") === "stream")
  const recordings = all.filter((v) => v.contentType === "recording")
  const current = activeType === "stream" ? streams : recordings

  const config = {
    stream: {
      title: "Streams",
      sub: "VODs de streams en vivo descargados y pendientes de clasificar.",
      empty: "No hay streams sin clasificar. Agrega uno para empezar.",
    },
    recording: {
      title: "Grabaciones",
      sub: "Videos grabados offline pendientes de organizar y editar.",
      empty: "No hay grabaciones pendientes. Agrega una para empezar.",
    },
  }[activeType]

  return (
    <>
      <div
        className="flex gap-1 mb-5 p-1 rounded-xl w-fit"
        style={{ background: "var(--code-bg)" }}
      >
        {CONTENT_TABS.map((tab) => {
          const count = tab.id === "stream" ? streams.length : recordings.length
          const isActive = activeType === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium cursor-pointer border-none transition-all duration-150"
              style={{
                background: isActive ? "var(--bg)" : "transparent",
                color: isActive ? "var(--sf-primary)" : "var(--text)",
                boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {count > 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive
                      ? "var(--sf-primary)"
                      : "var(--border)",
                    color: isActive ? "#fff" : "var(--text)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <BucketView
        key={activeType}
        bucketId="inbox"
        title={config.title}
        sub={config.sub}
        emptyText={config.empty}
        vods={current}
        destinations={DESTINATIONS}
        defaultContentType={activeType}
        onAdd={(data) => addVod("inbox", { ...data, contentType: activeType })}
        onUpdate={updateVod}
        onMove={moveVod}
        onRemove={removeVod}
        onReorder={reorderVods}
      />
    </>
  )
}
