import { useState, useCallback } from "react"
import { DELETE_PIN } from "../constants/deletePin"

export function useDeleteSections() {
  const [pinOk, setPinOk] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [selected, setSelected] = useState([])
  const [deleted, setDeleted] = useState(false)

  const submitPin = useCallback((pin) => {
    if (pin === DELETE_PIN) {
      setPinOk(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }, [])

  const toggleSection = useCallback((id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }, [])

  const deleteSelected = useCallback(() => {
    if (selected.length === 0) return
    try {
      const vodKeys = selected.filter((s) => s !== "notes")
      if (vodKeys.length > 0) {
        const raw = localStorage.getItem("streamflow:vods")
        const buckets = raw ? JSON.parse(raw) : {}
        vodKeys.forEach((k) => {
          buckets[k] = []
        })
        localStorage.setItem("streamflow:vods", JSON.stringify(buckets))
      }
      if (selected.includes("notes")) {
        localStorage.removeItem("streamflow:notes")
      }
      setDeleted(true)
      setSelected([])
    } catch {
      alert("No se pudieron borrar los datos.")
    }
  }, [selected])

  return {
    pinOk,
    pinError,
    selected,
    deleted,
    submitPin,
    toggleSection,
    deleteSelected,
  }
}
