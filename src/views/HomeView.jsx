import { useTodaySuggestions } from "../hooks/useTodaySuggestions"
import { useWeeklyStats } from "../hooks/useWeeklyStats"
import { useDaysSinceUpload } from "../hooks/useDaysSinceUpload"
import WeeklySummary from "../components/WeeklySummary"
import QuickNotes from "../components/QuickNotes"
import {
  StatCard,
  TodayItem,
  PhaseRow,
  SectionTitle,
  DaysSinceUpload,
} from "../components/HomeWidgets"
import { TOTAL_PHASES } from "../constants/phases"

export default function HomeView({ buckets, onNavigate }) {
  const suggestions = useTodaySuggestions(buckets)
  const weeklyStats = useWeeklyStats(buckets)
  const daysSince = useDaysSinceUpload(buckets)

  const editingVods = buckets.editing ?? []
  const activeEdit = editingVods[0] ?? null
  const inboxCount = buckets.inbox?.length ?? 0
  const shortsCount = buckets.shorts?.length ?? 0
  const trashCount = buckets.trash?.length ?? 0

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches"
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <>
      <h1
        className="text-2xl font-semibold mb-1"
        style={{ color: "var(--text-h)" }}
      >
        {greeting}, Adrian 👋
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text)" }}>
        {today}
      </p>

      <WeeklySummary stats={weeklyStats} onNavigate={onNavigate} />

      <div className="grid grid-cols-4 gap-3 mb-3">
        <StatCard
          label="Sin clasificar"
          value={inboxCount}
          sub="VODs esperando"
          onClick={() => onNavigate("content")}
        />
        <StatCard
          label="En edición"
          value={editingVods.length}
          sub={
            activeEdit
              ? `Fase ${activeEdit.phase} de ${TOTAL_PHASES}`
              : "Sin videos"
          }
          onClick={() => onNavigate("editing")}
        />
        <StatCard
          label="Shorts listos"
          value={shortsCount}
          sub="Para extraer"
          onClick={() => onNavigate("shorts")}
        />
        <StatCard
          label="Para borrar"
          value={trashCount}
          sub="Liberar espacio"
          onClick={() => onNavigate("trash")}
          warn={trashCount > 0}
        />
      </div>

      {daysSince && (
        <div className="mb-4">
          <DaysSinceUpload
            data={daysSince}
            onClick={() => onNavigate("trash")}
          />
        </div>
      )}

      <div
        className="grid grid-cols-[1fr_300px] gap-4 mb-6"
        style={{ maxHeight: 380 }}
      >
        <div
          className="flex flex-col gap-2 overflow-y-auto pr-1"
          style={{ maxHeight: 380 }}
        >
          <SectionTitle>Sugerido para hoy</SectionTitle>
          {suggestions.length === 0 ? (
            <div
              className="rounded-xl px-4 py-8 text-center border border-dashed"
              style={{ borderColor: "var(--border)" }}
            >
              <p className="text-2xl mb-2">🎉</p>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "var(--text-h)" }}
              >
                Todo al día
              </p>
              <p className="text-[13px]" style={{ color: "var(--text)" }}>
                Agrega un VOD nuevo para empezar.
              </p>
            </div>
          ) : (
            suggestions.map((s) => (
              <TodayItem
                key={s.id}
                suggestion={s}
                onClick={() => onNavigate(s.navigate)}
              />
            ))
          )}
        </div>

        <div
          className="flex flex-col gap-3 overflow-y-auto pr-1"
          style={{ maxHeight: 380 }}
        >
          {activeEdit ? (
            <>
              <SectionTitle>Edición actual</SectionTitle>
              <div
                className="rounded-xl p-4 border cursor-pointer transition-colors duration-150 hover:border-(--accent-border)"
                style={{
                  background: "var(--bg)",
                  borderColor: "var(--border)",
                }}
                onClick={() => onNavigate("editing")}
              >
                <p
                  className="text-[13px] font-medium mb-3 leading-snug"
                  style={{ color: "var(--text-h)" }}
                >
                  {activeEdit.videoTitle || activeEdit.title}
                </p>
                <div className="flex flex-col gap-2">
                  {[1, 2, 3, 4].map((n) => (
                    <PhaseRow key={n} n={n} currentPhase={activeEdit.phase} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <SectionTitle>Acceso rápido</SectionTitle>
              {[
                {
                  id: "content",
                  icon: "🎮",
                  label: "Contenido sin clasificar",
                },
                { id: "ideas", icon: "💡", label: "Ideas de contenido" },
                { id: "editing", icon: "✂️", label: "En edición" },
                { id: "shorts", icon: "📱", label: "Pool de shorts" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border text-left cursor-pointer transition-colors duration-150 hover:border-(--accent-border) w-full bg-transparent"
                  style={{
                    background: "var(--bg)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: "var(--text-h)" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="ml-auto text-[12px]"
                    style={{ color: "var(--text)" }}
                  >
                    →
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      <QuickNotes />
    </>
  )
}
