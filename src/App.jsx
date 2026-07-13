import { TABS } from "./constants/nav"
import { useVodStore } from "./store/vodStore"
import { useActiveTab } from "./hooks/useActiveTab"
import HomeView from "./views/HomeView"
import InboxView from "./views/InboxView"
import IdeasView from "./views/IdeasView"
import EditingView from "./views/EditingView"
import ShortsView from "./views/ShortsView"
import TrashView from "./views/TrashView"

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
  } = useVodStore()

  const view = () => {
    switch (activeTab) {
      case "home":
        return <HomeView key="home" buckets={buckets} onNavigate={navigate} />
      case "inbox":
        return (
          <InboxView
            key="inbox"
            buckets={buckets}
            addVod={addVod}
            updateVod={updateVod}
            moveVod={moveVod}
            removeVod={removeVod}
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
        <button
          onClick={() => navigate("home")}
          className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none p-0"
        >
          <div
            className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-white text-sm shrink-0"
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
        </button>
        <span
          className="text-[12px] capitalize"
          style={{ color: "var(--text)" }}
        >
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </span>
      </header>

      <nav
        className="flex shrink-0 overflow-x-auto"
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
              onClick={() => navigate(tab.id)}
              className="flex items-center gap-1.5 px-4 py-3 text-[13px] border-b-2 cursor-pointer border-t-0 border-x-0 bg-transparent transition-all duration-150 whitespace-nowrap"
              style={{
                borderBottomColor: isActive ? "var(--sf-green)" : "transparent",
                color: isActive ? "var(--sf-green)" : "var(--text)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {tab.label}
              {count !== null && count > 0 && (
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-full transition-colors duration-150"
                  style={{
                    background: isActive ? "var(--sf-green)" : "var(--code-bg)",
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
        <div className="w-full max-w-5xl mx-auto px-6 py-6">{view()}</div>
      </main>
    </div>
  )
}
