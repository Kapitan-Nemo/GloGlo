import { defineStore } from 'pinia'

export const useModal = defineStore('modal', {
  state: () => {
    return {
      showAppliance: false,
      showSummary: false,
    }
  },
})
