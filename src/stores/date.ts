import { defineStore } from "pinia";

export const useDateStore = defineStore("dateStore", {
  state: () => ({
    date: new Date(),
  }),
  actions: {
    month() {
      return this.date.getMonth();
    },
    year() {
      return this.date.getFullYear();
    },
  },
  persist: true,
});
