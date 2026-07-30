const STORAGE_KEY = "streamflow:vods"

export function useDataBackup() {
  const exportBackup = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? "{}"
      const data = {
        version: 1,
        exportedAt: new Date().toISOString(),
        vods: JSON.parse(raw),
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `streamflow-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert("No se pudo exportar el backup.")
    }
  }

  const importBackup = (file, onSuccess) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result)
        if (!data.vods || typeof data.vods !== "object") {
          alert("El archivo no es un backup válido de StreamFlow.")
          return
        }
        if (
          !confirm(
            "¿Reemplazar todos los datos actuales con este backup? Esta acción no se puede deshacer.",
          )
        )
          return
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.vods))
        onSuccess?.()
      } catch {
        alert(
          "No se pudo leer el archivo. Asegúrate de que sea un backup válido de StreamFlow.",
        )
      }
    }
    reader.readAsText(file)
  }

  return { exportBackup, importBackup }
}
