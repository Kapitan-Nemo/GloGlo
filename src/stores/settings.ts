import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settingsStore', {
  state: () => ({
    currentAvatar: 'avatar-1'
  }),
  persist: true
})
