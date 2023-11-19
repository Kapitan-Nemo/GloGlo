export async function createSlug(post: Ref<IPost>) {
  watch(() => post.value.title, (value: string) => {
    const polishToEnglish: Record<string, string> = {
      ą: 'a',
      ć: 'c',
      ę: 'e',
      ł: 'l',
      ń: 'n',
      ó: 'o',
      ś: 's',
      ź: 'z',
      ż: 'z',
      Ą: 'A',
      Ć: 'C',
      Ę: 'E',
      Ł: 'L',
      Ń: 'N',
      Ó: 'O',
      Ś: 'S',
      Ź: 'Z',
      Ż: 'Z',
    }
    post.value.slug = value.toLowerCase().split('').map((char: string) => polishToEnglish[char] || char).join('').replace(/ /g, '-')
  })
}
