import { useState } from "react"
import { TABS, STORE_KEYS } from "./constants/nav"
import { useVodStore } from "./store/vodStore"
import HomeView from "./views/HomeView"
import InboxView from "./views/InboxView"
import IdeasView from "./views/IdeasView"
import EditingView from "./views/EditingView"
import ShortsView from "./views/ShortsView"
import TrashView from "./views/TrashView"

export default function App() {
  const [activeTab, setActiveTab] = useState("home")
  const store = useVodStore()
  const {
    buckets,
    addVod,
    moveVod,
    updateVod,
    advancePhase,
    regressPhase,
    removeVod,
  } = store

  const moveAndNavigate = (vodId, fromId, toId) => {
    moveVod(vodId, fromId, toId)
    setActiveTab(toId)
  }

  const view = () => {
    switch (activeTab) {
      case "home":
        return <HomeView buckets={buckets} onNavigate={setActiveTab} />
      case "inbox":
        return (
          <InboxView
            buckets={buckets}
            addVod={addVod}
            moveVod={moveVod}
            removeVod={removeVod}
          />
        )
      case "ideas":
        return (
          <IdeasView
            buckets={buckets}
            addVod={addVod}
            moveVod={moveVod}
            removeVod={removeVod}
          />
        )
      case "editing":
        return (
          <EditingView
            buckets={buckets}
            addVod={addVod}
            moveVod={moveVod}
            advancePhase={advancePhase}
            regressPhase={regressPhase}
            removeVod={removeVod}
          />
        )
      case "shorts":
        return (
          <ShortsView
            buckets={buckets}
            addVod={addVod}
            moveVod={moveVod}
            removeVod={removeVod}
          />
        )
      case "trash":
        return <TrashView buckets={buckets} removeVod={removeVod} />
      default:
        return null
    }
  }

  return (
    <div
      className="min-h-svh flex flex-col"
      style={{ background: "var(--sf-bg)", fontFamily: "var(--sans)" }}
    >
      <header
        className="h-[52px] flex items-center justify-between px-5 sticky top-0 z-10 shrink-0"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-white text-sm"
            style={{ background: "var(--sf-green)" }}
          >
            🎬
          </div>
          <span
            className="text-[15px] font-semibold tracking-tight"
            style={{ color: "var(--text-h)" }}
          >
            Stream<span style={{ color: "var(--sf-green)" }}>Flow</span>
          </span>
        </div>
        <span className="text-[12px]" style={{ color: "var(--text)" }}>
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </header>

      <nav
        className="flex gap-0 px-5 shrink-0 overflow-x-auto"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {TABS.map((tab) => {
          const count = tab.storeKey
            ? (buckets[tab.storeKey]?.length ?? 0)
            : null
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-1.5 px-3.5 py-3 text-[13px] border-b-2 cursor-pointer border-none bg-transparent transition-colors duration-150 whitespace-nowrap"
              style={{
                borderBottomColor: isActive ? "var(--sf-green)" : "transparent",
                color: isActive ? "var(--sf-green)" : "var(--text)",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <i className={`ti ${tab.icon} text-sm`} aria-hidden="true" />
              {tab.label}
              {count !== null && count > 0 && (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive
                      ? "var(--sf-green-dim)"
                      : "var(--code-bg)",
                    color: isActive ? "var(--sf-edit-text)" : "var(--text)",
                  }}
                >
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <main className="flex-1 overflow-y-auto">
        <div className="w-full max-w-5xl mx-auto px-6 py-6">{view()}</div>
      </main>
    </div>
  )
}
