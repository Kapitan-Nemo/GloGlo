export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()
  const config = useRuntimeConfig()

  if (!auth.logged || config.public.FIREBASE_ADMINID !== auth.userID) {
    await useToast('Spierdalaj z mojej ziemi!', 'error')
    return navigateTo('/')
  }
})
