import type { Basic } from 'unsplash-js/dist/methods/photos/types'
import type { Photos } from 'unsplash-js/dist/methods/search/types/response'

export interface PhotoResponse extends Photos {
  results: (Basic & {
    liked_by_user?: boolean
  })[]
}
