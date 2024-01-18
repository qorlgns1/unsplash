import type { Photo } from '@/modules/domain/Photo'
import { atom } from 'recoil'

interface Bookmark {
  [photoId: string]: Photo
}

export const bookmarkAtom = atom<Bookmark>({
  key: 'bookmark',
  default: {},
})
