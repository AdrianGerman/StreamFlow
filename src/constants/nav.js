export const TABS = [
  {
    id: "home",
    label: "Inicio",
    icon: "ti-home",
  },
  {
    id: "streams",
    label: "Streams",
    icon: "ti-device-tv",
    storeKey: "inbox",
    filter: "stream",
  },
  {
    id: "recordings",
    label: "Grabaciones",
    icon: "ti-video",
    storeKey: "inbox",
    filter: "recording",
  },
  {
    id: "ideas",
    label: "Ideas",
    icon: "ti-bulb",
    storeKey: "ideas",
  },
  {
    id: "editing",
    label: "Edición",
    icon: "ti-cut",
    storeKey: "editing",
  },
  {
    id: "shorts",
    label: "Shorts",
    icon: "ti-device-mobile",
    storeKey: "shorts",
  },
  {
    id: "trash",
    label: "Para borrar",
    icon: "ti-trash",
    storeKey: "trash",
  },
]

export const STORE_KEYS = ["inbox", "ideas", "editing", "shorts", "trash"]

export const TAB_MAP = Object.fromEntries(TABS.map((t) => [t.id, t]))
