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

export function convertTimestamp(timestamp: Timestamp): string {
  const date = new Date(timestamp.seconds * 1000)
  return date.toLocaleString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
