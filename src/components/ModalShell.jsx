export default function ModalShell({ onClose, width = 440, children }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl max-h-[90vh] overflow-y-auto"
        style={{
          background: "var(--bg)",
          boxShadow: "var(--shadow-lg)",
          width,
          maxWidth: "calc(100vw - 32px)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function ModalHeader({ title, sub, accentColor }) {
  return (
    <div
      className="px-6 py-4 rounded-t-2xl"
      style={{
        background: accentColor ?? "var(--sf-primary)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <h2 className="text-[15px] font-bold m-0 text-white">{title}</h2>
      {sub && <p className="text-[12px] mt-0.5 text-white opacity-80">{sub}</p>}
    </div>
  )
}

export function ModalBody({ children }) {
  return <div className="px-6 py-5">{children}</div>
}

export function ModalFooter({ children }) {
  return (
    <div
      className="px-6 py-4 flex gap-2"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--code-bg)",
        borderRadius: "0 0 16px 16px",
      }}
    >
      {children}
    </div>
  )
}
