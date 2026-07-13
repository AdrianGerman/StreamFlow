import { useTodaySuggestions } from "../hooks/useTodaySuggestions"
import { TOTAL_PHASES } from "../constants/phases"

export default function HomeView({ buckets, onNavigate }) {
  const suggestions = useTodaySuggestions(buckets)
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

      <div className="grid grid-cols-4 gap-3 mb-8">
        <StatCard
          label="Sin clasificar"
          value={inboxCount}
          sub="VODs esperando"
          onClick={() => onNavigate("inbox")}
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

      <div className="grid grid-cols-[1fr_320px] gap-6 items-start">
        <div>
          <SectionTitle>Sugerido para hoy</SectionTitle>
          <div className="flex flex-col gap-2">
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
        </div>

        <div>
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
                  {activeEdit.title}
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
              <div className="flex flex-col gap-2">
                {[
                  { id: "inbox", icon: "📥", label: "VODs sin clasificar" },
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
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function StatCard({ label, value, sub, onClick, warn }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-4 border cursor-pointer transition-all duration-150 hover:border-(--accent-border) w-full bg-transparent"
      style={{
        background: "var(--code-bg)",
        borderColor: warn && value > 0 ? "#f5a623" : "var(--border)",
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-widest mb-2"
        style={{ color: "var(--text)" }}
      >
        {label}
      </p>
      <p
        className="text-3xl font-semibold mb-1"
        style={{ color: "var(--text-h)" }}
      >
        {value}
      </p>
      <p className="text-[11px]" style={{ color: "var(--text)" }}>
        {sub}
      </p>
    </button>
  )
}

function TodayItem({ suggestion: s, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-4 py-3 border text-left w-full cursor-pointer transition-all duration-150 hover:border-(--accent-border) bg-transparent"
      style={{
        background: "var(--bg)",
        borderColor: s.urgent ? "#f5a623" : "var(--border)",
      }}
    >
      <span className="text-xl flex-shrink-0">{s.icon}</span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-medium truncate"
          style={{ color: "var(--text-h)" }}
        >
          {s.title}
        </p>
        <p
          className="text-[11px] mt-0.5 truncate"
          style={{ color: "var(--text)" }}
        >
          {s.sub}
        </p>
      </div>
      <span
        className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
        style={{ background: s.tagBg, color: s.tagColor }}
      >
        {s.tag}
      </span>
    </button>
  )
}

function PhaseRow({ n, currentPhase }) {
  const done = n < currentPhase
  const active = n === currentPhase

  return (
    <div
      className="flex items-center gap-3 rounded-lg px-3 py-2"
      style={{
        background: done || active ? "var(--sf-edit-bg)" : "var(--code-bg)",
        border: active ? "1px solid var(--sf-green)" : "1px solid transparent",
        opacity: n > currentPhase ? 0.5 : 1,
      }}
    >
      <span
        className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 text-white"
        style={{
          background: done || active ? "var(--sf-green)" : "var(--border)",
        }}
      >
        {done ? "✓" : n}
      </span>
      <span
        className="text-[12px] font-medium"
        style={{
          color: done || active ? "var(--sf-edit-text)" : "var(--text)",
        }}
      >
        {phaseLabel(n)}
      </span>
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-widest mb-3"
      style={{ color: "var(--text)" }}
    >
      {children}
    </p>
  )
}

function phaseLabel(n) {
  return ["Cortar", "Zoom y edición", "Música", "Intro y outro"][n - 1] ?? ""
}
