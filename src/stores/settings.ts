import { defineStore } from "pinia"
import type { servers } from "src/constants"
import { getNavigatorLanguage } from "src/i18n"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    player: {
      autoNext: true,
      enableRemindStop: true,
      volume: 1,
      server: <keyof typeof servers>"DU",
      autoSkipIEnd: false,
      preResolve: 30,
      checkEndPreList: 5
    },
    ui: {
      modeMovie: false,
      commentAnime: true,
    },
    locale: getNavigatorLanguage(),
    infinityScroll: true,
    hostUrl: import.meta.env.HOST_CURL || HOST_CURL,
  }),
  persist: true,
})
