import { PHASES, TOTAL_PHASES } from "../constants/phases"

export default function PhaseBar({ phase, onAdvance, onRegress }) {
  const currentPhase = PHASES.find((p) => p.id === phase)

  return (
    <div className="mt-3">
      <div className="flex gap-[3px]">
        {PHASES.map((p) => (
          <div
            key={p.id}
            className="flex-1 h-[3px] rounded-full transition-colors duration-200"
            style={{
              background: p.id <= phase ? "var(--sf-green)" : "var(--border)",
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className="text-[10px] font-semibold"
            style={{ color: "var(--sf-green)" }}
          >
            Fase {phase}/{TOTAL_PHASES}
          </span>
          <span className="text-[10px]" style={{ color: "var(--text)" }}>
            {currentPhase?.label}
          </span>
        </div>

        {(onAdvance || onRegress) && (
          <div className="flex gap-1">
            <PhaseBtn
              onClick={onRegress}
              disabled={phase <= 1}
              symbol="←"
              title="Fase anterior"
            />
            <PhaseBtn
              onClick={onAdvance}
              disabled={phase >= TOTAL_PHASES}
              symbol="→"
              title="Siguiente fase"
            />
          </div>
        )}
      </div>
    </div>
  )
}

function PhaseBtn({ onClick, disabled, symbol, title }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-5 h-5 rounded text-[11px] font-bold flex items-center justify-center border transition-opacity duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
      style={{
        borderColor: "var(--sf-green)",
        color: "var(--sf-green)",
        background: "transparent",
      }}
    >
      {symbol}
    </button>
  )
}
