import { useState } from "react"
import { useDeleteSections } from "../hooks/useDeleteSections"

const SECTIONS = [
  { id: "inbox", label: "Contenido sin clasificar", icon: "🎮" },
  { id: "ideas", label: "Ideas de contenido", icon: "💡" },
  { id: "editing", label: "En edición", icon: "✂️" },
  { id: "shorts", label: "Pool de shorts", icon: "📱" },
  { id: "trash", label: "Para borrar", icon: "🗑️" },
  { id: "notes", label: "Notas rápidas", icon: "📝" },
]

export default function DeleteSection({ onDeleted }) {
  const [open, setOpen] = useState(false)
  const [pin, setPin] = useState("")

  const {
    pinOk,
    pinError,
    selected,
    deleted,
    submitPin,
    toggleSection,
    deleteSelected,
  } = useDeleteSections()

  const handleSubmitPin = () => {
    submitPin(pin)
    setPin("")
  }

  if (deleted && !open) onDeleted?.()

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: open ? "var(--danger)" : "var(--border)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer border-none transition-colors duration-150"
        style={{
          background: open ? "var(--danger-bg)" : "var(--code-bg)",
          color: "var(--danger)",
        }}
      >
        <span className="text-[13px] font-semibold">
          🗑 Borrar datos por sección
        </span>
        <span className="text-[11px]">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div
          className="px-4 pb-4 pt-3"
          style={{ background: "var(--code-bg)" }}
        >
          {deleted ? (
            <DeletedState />
          ) : !pinOk ? (
            <PinInput
              pin={pin}
              error={pinError}
              onChange={setPin}
              onSubmit={handleSubmitPin}
            />
          ) : (
            <SectionPicker
              sections={SECTIONS}
              selected={selected}
              onToggle={toggleSection}
              onDelete={deleteSelected}
            />
          )}
        </div>
      )}
    </div>
  )
}

function DeletedState() {
  return (
    <div className="text-center py-4">
      <p className="text-2xl mb-2">✅</p>
      <p className="text-[13px] font-medium" style={{ color: "var(--text-h)" }}>
        Datos borrados correctamente
      </p>
      <p className="text-[12px] mt-1" style={{ color: "var(--text)" }}>
        La página se recargará al cerrar.
      </p>
    </div>
  )
}

function PinInput({ pin, error, onChange, onSubmit }) {
  return (
    <>
      <p className="text-[12px] mb-3" style={{ color: "var(--text)" }}>
        Ingresa el PIN de seguridad para acceder a esta sección.
      </p>
      <div className="flex gap-2">
        <input
          type="password"
          value={pin}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
          placeholder="PIN"
          maxLength={8}
          className="flex-1 text-[13px] rounded-lg border outline-none text-center tracking-widest font-mono"
          style={{
            padding: "8px",
            borderColor: error ? "var(--danger)" : "var(--border)",
            background: "var(--bg)",
            color: "var(--text-h)",
          }}
        />
        <button
          onClick={onSubmit}
          className="px-4 py-2 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white"
          style={{ background: "var(--danger)" }}
        >
          Entrar
        </button>
      </div>
      {error && (
        <p className="text-[11px] mt-1.5" style={{ color: "var(--danger)" }}>
          PIN incorrecto. Inténtalo de nuevo.
        </p>
      )}
    </>
  )
}

function SectionPicker({ sections, selected, onToggle, onDelete }) {
  return (
    <>
      <p className="text-[12px] mb-3" style={{ color: "var(--text)" }}>
        Selecciona las secciones que quieres vaciar:
      </p>
      <div className="flex flex-col gap-1.5 mb-4">
        {sections.map((s) => (
          <label
            key={s.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-150"
            style={{
              background: selected.includes(s.id)
                ? "var(--danger-bg)"
                : "var(--bg)",
              border: `1px solid ${selected.includes(s.id) ? "var(--danger-border)" : "var(--border)"}`,
            }}
          >
            <input
              type="checkbox"
              checked={selected.includes(s.id)}
              onChange={() => onToggle(s.id)}
              className="cursor-pointer"
              style={{ accentColor: "var(--danger)" }}
            />
            <span className="text-base">{s.icon}</span>
            <span
              className="text-[13px] font-medium"
              style={{ color: "var(--text-h)" }}
            >
              {s.label}
            </span>
          </label>
        ))}
      </div>
      <button
        onClick={onDelete}
        disabled={selected.length === 0}
        className="w-full py-2.5 rounded-lg text-[13px] font-semibold cursor-pointer border-none text-white transition-opacity disabled:opacity-30"
        style={{ background: "var(--danger)" }}
      >
        {selected.length === 0
          ? "Selecciona al menos una sección"
          : `Borrar ${selected.length} sección${selected.length > 1 ? "es" : ""}`}
      </button>
    </>
  )
}
