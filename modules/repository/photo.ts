import { unsplashApi as api } from '@/modules/repository'
import type { PaginationParams } from 'unsplash-js/dist/types/request'

interface SearchPhotosParams extends PaginationParams {
  query: string
}

export const photoRepository = {
  searchPhotos: async ({ query, page }: SearchPhotosParams) => {
    return api.search.getPhotos({ query, page, perPage: 12 })
  },
  getPhoto: async (id: string) => {
    return api.photos.get({ photoId: id })
  },
  getRandomPhotos: async () => {
    return api.photos.getRandom({ count: 12 })
  },
}
