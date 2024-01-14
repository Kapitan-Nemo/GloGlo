<script setup lang="ts">
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

const auth = useAuth()
const router = useRouter()

function singGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      // go to admin panel
      router.push('/admin')
      useToast('Jazda z kurwami', 'success')
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

function singOut() {
  signOut(getAuth())
    .then(async () => {
      useToast('No i chuj, no i cześć.', 'success')
      auth.$reset()
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

onMounted(() => {
  auth.onAuth()
})
</script>

<template>
  <div class="mt-8">
    <div class="flex flex-col items-center ">
      <h2 class="text-2xl mb-4">
        <ClientOnly>
          <template #default>
            <div v-if="auth.userName">
              Witaj Mój Panie. <span class="wave">👋</span>
            </div>
            <div v-else>
              Elo, zaloguj się mordo.  <span class="wave">👋</span>
            </div>
          </template>
        </ClientOnly>
      </h2>
      <button v-if="auth.logged" class="px-8 py-2 bg-white border-4 border-black font-bold text-black rounded-none" @click="singOut">
        Wyloguj
      </button>
    </div>

    <div v-if="!auth.logged" class="container flex items-center flex-col">
      <div class="cursor-pointer" @click="singGoogle">
        <button class="px-8 py-2 bg-white border-4 border-black text-black font-bold">
          Super logowanie kurwo
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
    0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}
</style>
