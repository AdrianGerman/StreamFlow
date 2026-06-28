import { TOTAL_PHASES } from "../constants/phases"
import { TABS } from "../constants/nav"

export default function HomeView({ buckets, onNavigate }) {
  const inboxCount = buckets.inbox?.length ?? 0
  const editingVods = buckets.editing ?? []
  const shortsCount = buckets.shorts?.length ?? 0
  const trashCount = buckets.trash?.length ?? 0
  const activeEdit = editingVods[0] ?? null

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? "Buenos días" : hour < 20 ? "Buenas tardes" : "Buenas noches"

  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <div className="p-5 max-w-2xl">
      <h1
        className="text-xl font-medium mb-0.5"
        style={{ color: "var(--text-h)" }}
      >
        {greeting}, Adrian 👋
      </h1>
      <p className="text-sm mb-6" style={{ color: "var(--text)" }}>
        {today}
      </p>

      <div className="grid grid-cols-4 gap-2.5 mb-7">
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

      <SectionTitle>Sugerido para hoy</SectionTitle>
      <div className="flex flex-col gap-2 mb-7">
        {activeEdit && (
          <TodayItem
            icon="✂️"
            title={`Continuar edición — ${activeEdit.title}`}
            sub={`Fase ${activeEdit.phase}: ${phaseLabel(activeEdit.phase)} · ${activeEdit.duration || "sin duración"}`}
            tag="En edición"
            tagClass="bg-[#c8f0e0] text-[#0a3d2e]"
            onClick={() => onNavigate("editing")}
          />
        )}
        {inboxCount > 0 && (
          <TodayItem
            icon="📥"
            title={`Clasificar ${inboxCount} VOD${inboxCount > 1 ? "s" : ""} sin revisar`}
            sub={`El más reciente: ${buckets.inbox[0]?.title ?? ""}`}
            tag="Pendiente"
            tagClass="bg-[#daeafa] text-[#0d3a5c]"
            onClick={() => onNavigate("inbox")}
          />
        )}
        {shortsCount > 0 && (
          <TodayItem
            icon="📱"
            title={`Extraer shorts de ${shortsCount} video${shortsCount > 1 ? "s" : ""}`}
            sub="Videos terminados esperando clips"
            tag="Shorts"
            tagClass="bg-[#fad6e4] text-[#5c0d2a]"
            onClick={() => onNavigate("shorts")}
          />
        )}
        {!activeEdit && inboxCount === 0 && shortsCount === 0 && (
          <p
            className="text-sm py-4 text-center"
            style={{ color: "var(--text)" }}
          >
            Todo al día 🎉 Agregá un VOD nuevo para empezar.
          </p>
        )}
      </div>

      {activeEdit && (
        <>
          <SectionTitle>Edición actual</SectionTitle>
          <div
            className="rounded-xl p-4 border"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}
          >
            <p
              className="text-sm font-medium mb-3"
              style={{ color: "var(--text-h)" }}
            >
              {activeEdit.title}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="flex-1 rounded-lg p-2.5"
                  style={{
                    background:
                      n < activeEdit.phase
                        ? "#e1f5ee"
                        : n === activeEdit.phase
                          ? "#c8f0e0"
                          : "var(--code-bg)",
                    border:
                      n === activeEdit.phase
                        ? "1px solid #1d9e75"
                        : "1px solid transparent",
                  }}
                >
                  <p
                    className="text-[10px] font-semibold uppercase tracking-wide mb-1"
                    style={{
                      color: n <= activeEdit.phase ? "#0f6e56" : "var(--text)",
                    }}
                  >
                    Fase {n}
                  </p>
                  <p
                    className="text-[12px] font-medium"
                    style={{
                      color:
                        n <= activeEdit.phase ? "#0a3d2e" : "var(--text-h)",
                    }}
                  >
                    {phaseLabel(n)} {n < activeEdit.phase ? "✓" : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function StatCard({ label, value, sub, onClick, warn }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-3.5 border transition-colors duration-150 cursor-pointer hover:border-(--accent) w-full"
      style={{
        background: "var(--code-bg)",
        borderColor: warn && value > 0 ? "#f5a623" : "var(--border)",
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-wide mb-1.5"
        style={{ color: "var(--text)" }}
      >
        {label}
      </p>
      <p className="text-2xl font-medium" style={{ color: "var(--text-h)" }}>
        {value}
      </p>
      <p className="text-[11px] mt-0.5" style={{ color: "var(--text)" }}>
        {sub}
      </p>
    </button>
  )
}

function TodayItem({ icon, title, sub, tag, tagClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3.5 py-3 border text-left w-full transition-colors duration-150 hover:border-(--accent-border) cursor-pointer"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <span className="text-lg shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[13px] font-medium truncate"
          style={{ color: "var(--text-h)" }}
        >
          {title}
        </p>
        <p className="text-[11px] mt-0.5" style={{ color: "var(--text)" }}>
          {sub}
        </p>
      </div>
      <span
        className={`text-[10px] font-semibold px-2 py-1 rounded-full shrink-0 ${tagClass}`}
      >
        {tag}
      </span>
    </button>
  )
}

function SectionTitle({ children }) {
  return (
    <p
      className="text-[11px] font-semibold uppercase tracking-wider mb-2.5"
      style={{ color: "var(--text)" }}
    >
      {children}
    </p>
  )
}

function phaseLabel(n) {
  return ["Cortar", "Zoom y edición", "Música", "Intro y outro"][n - 1] ?? ""
}
