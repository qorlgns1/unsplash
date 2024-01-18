import type { Basic, Full } from 'unsplash-js/dist/methods/photos/types'
import type { Photos } from 'unsplash-js/dist/methods/search/types/response'

export interface PhotoDetail extends Full {
  liked_by_user?: boolean
  tags?: {
    title: string
  }[]
  downloads?: number
}

export interface PhotoResponse extends Photos {
  results: (Basic & {
    liked_by_user?: boolean
  })[]
}
