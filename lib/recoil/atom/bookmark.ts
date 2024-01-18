import { atom } from 'recoil'

interface Bookmark {
  [key: string]: boolean
}

export const bookmarkAtom = atom<Bookmark>({
  key: 'bookmark',
  default: {},
})
