export interface IPost {
  id: string
  title: string
  slug: string
  content: string
  meta_title: string
  meta_description: string
  created_at: Date
}

export interface Timestamp {
  seconds: number
  nanoseconds: number
}

export interface statePost {
  edit: boolean
  create: boolean
}
