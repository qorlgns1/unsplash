import type { Basic } from 'unsplash-js/dist/methods/photos/types'

export interface Photo
  extends Pick<
    Basic,
    'id' | 'urls' | 'alt_description' | 'width' | 'height' | 'created_at' | 'user'
  > {
  liked_by_user?: boolean
}

export interface PhotoDetail extends Photo {
  tags?: {
    title: string
  }[]
  downloads?: number
}

export interface PhotoResponse {
  results: Photo[]
  total: number
  total_pages: number
}
