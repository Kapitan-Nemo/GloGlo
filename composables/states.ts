import DEFAULT_POST from '~/utils/constants'

export function useShowPost() {
  return useState <statePost> ('useShowPost', () => {
    return {
      drawer: false,
      edit: false,
      create: false,
    }
  })
}

export function useShowMedia() {
  return useState <boolean> ('useShowMedia', () => false)
}

export function useEditID() {
  return useState <string> ('useEditID', () => '')
}

export function useAllPosts() {
  return useState <IPost[]> ('useAllPosts', () => [])
}

export function usePost() {
  return useState <IPost> ('usePost', () => DEFAULT_POST)
}
