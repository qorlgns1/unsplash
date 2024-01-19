import { unsplashApi as api } from '@/modules/repository'

export const photoRepository = {
  searchPhotos: async (query: string, page: number) => {
    return api.search.getPhotos({ query, page, perPage: 12 })
  },
  getPhoto: async (id: string) => {
    return api.photos.get({ photoId: id })
  },
  getRandomPhotos: async () => {
    return api.photos.getRandom({ count: 12 })
  },
}
