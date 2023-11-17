import type { Timestamp } from 'firebase-admin/firestore'

export interface Blogs {
  content: string
  created_at: Timestamp
  updated_at: Timestamp
  slug: string
  title: string
}
