export default function WeeklySummary({ stats, onNavigate }) {
  const { completedVideos, shortsPosted, vodsAdded, dayOfWeek, isSunday } =
    stats

  const hasActivity = completedVideos > 0 || shortsPosted > 0 || vodsAdded > 0
  const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

  return (
    <div
      className="rounded-xl p-4 border mb-6"
      style={{ background: "var(--code-bg)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between mb-3">
        <p
          className="text-[11px] font-semibold uppercase tracking-widest"
          style={{ color: "var(--text)" }}
        >
          {isSunday ? "🎉 Resumen de la semana" : "Esta semana"}
        </p>
        {!hasActivity && (
          <p className="text-[11px]" style={{ color: "var(--text)" }}>
            Sin actividad aún
          </p>
        )}
      </div>

      <div className="flex gap-1 mb-4">
        {DAYS.map((d, i) => {
          const isPast = i < dayOfWeek
          const isToday = i === dayOfWeek
          return (
            <div key={d} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full h-1.5 rounded-full transition-all duration-300"
                style={{
                  background: isToday
                    ? "var(--sf-green)"
                    : isPast
                      ? "var(--border)"
                      : "var(--code-bg)",
                  border: isPast ? "1px solid var(--border)" : "none",
                  opacity: isPast ? 0.6 : 1,
                }}
              />
              <span
                className="text-[9px] font-medium uppercase tracking-wide"
                style={{ color: isToday ? "var(--sf-green)" : "var(--text)" }}
              >
                {d}
              </span>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <WeekStat
          value={completedVideos}
          label="Videos terminados"
          icon="✂️"
          onClick={() => onNavigate("trash")}
        />
        <WeekStat
          value={shortsPosted}
          label="Shorts subidos"
          icon="📱"
          onClick={() => onNavigate("shorts")}
        />
        <WeekStat
          value={vodsAdded}
          label="VODs agregados"
          icon="📥"
          onClick={() => onNavigate("streams")}
        />
      </div>

      {isSunday && hasActivity && (
        <p
          className="text-[12px] text-center mt-4 px-3 py-2 rounded-lg font-medium"
          style={{
            background: "var(--sf-green-dim)",
            color: "var(--sf-edit-text)",
          }}
        >
          {getMotivationalMessage(completedVideos, shortsPosted)}
        </p>
      )}
    </div>
  )
}

function WeekStat({ value, label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-center py-2.5 px-2 rounded-xl border cursor-pointer transition-all duration-150 hover:border-(--accent-border) w-full bg-transparent"
      style={{ borderColor: "var(--border)", background: "var(--bg)" }}
    >
      <p className="text-lg mb-0.5">{icon}</p>
      <p className="text-xl font-semibold" style={{ color: "var(--text-h)" }}>
        {value}
      </p>
      <p className="text-[10px] leading-tight" style={{ color: "var(--text)" }}>
        {label}
      </p>
    </button>
  )
}

function getMotivationalMessage(videos, shorts) {
  if (videos === 0 && shorts === 0)
    return "Semana tranquila. La próxima será más productiva 💪"
  if (videos >= 3) return `¡Semana increíble! ${videos} videos terminados 🔥`
  if (videos >= 1 && shorts >= 3)
    return `${videos} video${videos > 1 ? "s" : ""} y ${shorts} shorts. ¡Gran semana! 🚀`
  if (shorts >= 5) return `${shorts} shorts subidos. ¡Máquina de contenido! 📱`
  if (videos >= 1)
    return `${videos} video${videos > 1 ? "s" : ""} terminado${videos > 1 ? "s" : ""}. ¡Buen trabajo! ✅`
  return "Algo es algo. ¡Sigue adelante! 💪"
}
