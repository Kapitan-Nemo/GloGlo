import { defineStore } from 'pinia'

export const useAppliance = defineStore('appliance', {
  state: () => {
    return [{
      id: 1,
      device: 'TV',
      wattage: 10,
      time: 2,
      cost: 0,
    },
    {
      id: 2,
      device: 'Fridge',
      wattage: 20,
      time: 10,
      cost: 0,
    },
    ]
  },
})
