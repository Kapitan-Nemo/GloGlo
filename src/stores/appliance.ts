import { defineStore } from 'pinia'

export const useAppliance = defineStore('appliance', {

  state: () => {
    return {
      kwhCost: 0.70,
      applianceList: [{
        id: 1,
        device: 'TV',
        icon: 'tv',
        wattage: 100,
        time: 2,
        kwh: 0.2,
      },
      ],
    }
  },
})
