import type { Timestamp } from 'firebase-admin/firestore'

export interface IPost {
  id: string
  title: string
  slug: string
  content: string
  meta_title: string
  meta_description: string
  created_at: Date
}
