import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    userName: null as string | null,
    userId: '',
    logged: false
  }),

  actions: {
    onAuthStateChanged() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userName = user.displayName
          this.userId = user.uid
          this.logged = true
        } else {
          this.logged = false
          this.userId = ''
        }
      })
    }
  },
  persist: true
})
