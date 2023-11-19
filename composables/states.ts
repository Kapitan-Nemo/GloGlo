interface statePost {
  edit: boolean
  create: boolean
}

export function useShowPost() {
  return useState <statePost> ('useShowPost', () => {
    return {
      edit: false,
      create: false,
    }
  })
}

export function useEditID() {
  return useState <string> ('useEditID', () => '')
}

export function useAllPosts() {
  return useState <IPost[]> ('useAllPosts', () => [])
}
