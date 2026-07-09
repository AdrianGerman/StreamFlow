import { useState } from "react"
import { TABS } from "../constants/nav"

const STORAGE_KEY = "streamflow:tab"
const VALID_IDS = new Set(TABS.map((t) => t.id))

function loadTab() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved && VALID_IDS.has(saved) ? saved : "home"
  } catch {
    return "home"
  }
}

export function useActiveTab() {
  const [activeTab, setActiveTab] = useState(loadTab)

  const navigate = (tabId) => {
    if (!VALID_IDS.has(tabId)) return
    setActiveTab(tabId)
    try {
      localStorage.setItem(STORAGE_KEY, tabId)
    } catch {
      // localStorage no disponible, igual funciona en memoria
    }
  }

  return { activeTab, navigate }
}
