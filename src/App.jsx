import { useState } from "react"
import { TABS } from "./constants/nav"
import { useVodStore } from "./store/vodStore"
import { useActiveTab } from "./hooks/useActiveTab"
import HomeView from "./views/HomeView"
import ContentView from "./views/ContentView"
import IdeasView from "./views/IdeasView"
import EditingView from "./views/EditingView"
import ShortsView from "./views/ShortsView"
import TrashView from "./views/TrashView"
import HistoryView from "./views/HistoryView"
import DataManager from "./components/DataManager"

function tabCount(tab, buckets) {
  if (!tab.storeKey) return null
  return (buckets[tab.storeKey] ?? []).length
}

export default function App() {
  const { activeTab, navigate } = useActiveTab()
  const {
    buckets,
    addVod,
    updateVod,
    moveVod,
    advancePhase,
    regressPhase,
    removeVod,
    reorderVods,
  } = useVodStore()
  const [showDataManager, setShowDataManager] = useState(false)

  const view = () => {
    switch (activeTab) {
      case "home":
        return <HomeView key="home" buckets={buckets} onNavigate={navigate} />
      case "content":
        return (
          <ContentView
            key="content"
            buckets={buckets}
            addVod={addVod}
            updateVod={updateVod}
            moveVod={moveVod}
            removeVod={removeVod}
            reorderVods={reorderVods}
          />
        )
      case "ideas":
        return (
          <IdeasView
            key="ideas"
            buckets={buckets}
            addVod={addVod}
            updateVod={updateVod}
            moveVod={moveVod}
            removeVod={removeVod}
            reorderVods={reorderVods}
          />
        )
      case "editing":
        return (
          <EditingView
            key="editing"
            buckets={buckets}
            addVod={addVod}
            updateVod={updateVod}
            moveVod={moveVod}
            advancePhase={advancePhase}
            regressPhase={regressPhase}
            removeVod={removeVod}
            reorderVods={reorderVods}
          />
        )
      case "shorts":
        return (
          <ShortsView
            key="shorts"
            buckets={buckets}
            addVod={addVod}
            updateVod={updateVod}
            moveVod={moveVod}
            removeVod={removeVod}
            reorderVods={reorderVods}
          />
        )
      case "trash":
        return (
          <TrashView
            key="trash"
            buckets={buckets}
            updateVod={updateVod}
            removeVod={removeVod}
          />
        )
      case "history":
        return <HistoryView key="history" buckets={buckets} />
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
        className="h-[50px] flex items-center justify-between px-5 sticky top-0 z-10 shrink-0"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs shrink-0"
            style={{ background: "var(--sf-primary)" }}
          >
            🎬
          </div>
          <span
            className="text-[14px] font-semibold tracking-tight"
            style={{ color: "var(--text-h)" }}
          >
            Stream<span style={{ color: "var(--sf-primary)" }}>Flow</span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          <span
            className="text-[12px] capitalize hidden sm:block"
            style={{ color: "var(--text)" }}
          >
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
          <button
            onClick={() => setShowDataManager(true)}
            title="Backup y datos"
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-colors duration-150 hover:bg-(--code-bg)"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              background: "transparent",
            }}
          >
            💾 Backup
          </button>
        </div>
      </header>

      <nav
        className="flex shrink-0 overflow-x-auto"
        style={{
          background: "var(--bg)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {TABS.map((tab) => {
          const count = tabCount(tab, buckets)
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className="flex items-center gap-1.5 px-3 py-2.5 text-[12px] border-b-2 cursor-pointer border-t-0 border-x-0 bg-transparent transition-all duration-150 whitespace-nowrap"
              style={{
                borderBottomColor: isActive
                  ? "var(--sf-primary)"
                  : "transparent",
                color: isActive ? "var(--sf-primary)" : "var(--text)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab.label}
              {count !== null && count > 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-150"
                  style={{
                    background: isActive
                      ? "var(--sf-primary)"
                      : "var(--code-bg)",
                    color: isActive ? "#fff" : "var(--text)",
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
        <div className="w-full max-w-5xl mx-auto px-6 py-5">{view()}</div>
      </main>

      {showDataManager && (
        <DataManager onClose={() => setShowDataManager(false)} />
      )}
    </div>
  )
}
