import { defineStore } from 'pinia'

export const useAppliance = defineStore('appliance', {

  state: () => {
    return {
      kwhCost: 0.70,
      applianceList: [{
        id: 1,
        device: 'TV',
        icon: '/devices/tv.svg',
        wattage: 100,
        time: 2,
        kwh: 0.2,
      },
      {
        id: 2,
        device: 'Fridge',
        icon: '/devices/fridge.svg',
        wattage: 20,
        time: 10,
        kwh: 0.2,
      },
      ],
    }
  },
})
