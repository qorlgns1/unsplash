import { unsplashApi as api } from '@/modules/repository'

export const photoRepository = {
  searchPhotos: async (query: string) => {
    return api.search.getPhotos({ query })
  },
}
