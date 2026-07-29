import { useState } from "react"

export default function ActionBtn({
  children,
  onClick,
  danger = false,
  fullWidth = false,
}) {
  const [hov, setHov] = useState(false)

  const style = danger
    ? hov
      ? {
          background: "var(--danger)",
          color: "#fff",
          borderColor: "transparent",
        }
      : {
          background: "var(--bg)",
          color: "var(--danger)",
          borderColor: "var(--danger-border)",
        }
    : hov
      ? {
          background: "var(--code-bg)",
          color: "var(--text-h)",
          borderColor: "var(--border)",
        }
      : {
          background: "var(--bg)",
          color: "var(--text)",
          borderColor: "var(--border)",
        }

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border cursor-pointer transition-all duration-150 ${fullWidth ? "w-full" : ""}`}
      style={style}
    >
      {children}
    </button>
  )
}
