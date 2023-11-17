interface stateProduct {
  edit: boolean
  create: boolean
}

export function useShowProduct() {
  return useState <stateProduct> ('useShowProduct', () => {
    return {
      edit: true,
      create: true,
    }
  })
}
