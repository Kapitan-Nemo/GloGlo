import type { Blogs } from '@/utils/interface'
import { firestore } from '@/utils/firebase'

export default defineEventHandler(async () => {
  const ref = firestore.collection('blog/')
  const snapshot = await ref.get()
  const data = snapshot.docs.map(doc => doc.data())
  return data
})
