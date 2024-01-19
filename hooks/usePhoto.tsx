import { useEffect, useState } from 'react'

import type { PhotoResponse } from '@/modules/domain/Photo'
import { photoRepository } from '@/modules/repository/photo'

import useBookmark from './useBookmark'

interface SearchPhotoParams {
  searchQuery: string
  page: number
  onSuccess?: (photoResponse: PhotoResponse) => void
  onError?: () => void
}

const usePhoto = () => {
  const { bookmark, updatePhotoWithBookmarkStatus } = useBookmark()

  const [photoResponse, setPhotoResponse] = useState<PhotoResponse>({
    total: 0,
    total_pages: 0,
    results: [],
  })

  const updatePhotoResponseWithBookmarkStatus = (photoResponse: PhotoResponse) => ({
    ...photoResponse,
    results: photoResponse.results.map(updatePhotoWithBookmarkStatus),
  })

  const fetchSearchPhoto = async ({ searchQuery, page, onSuccess, onError }: SearchPhotoParams) => {
    const { type, response } = await photoRepository.searchPhotos({ query: searchQuery, page })
    if (type === 'success') {
      const photoResponse = updatePhotoResponseWithBookmarkStatus(response)
      setPhotoResponse(photoResponse)

      if (onSuccess) {
        onSuccess(photoResponse)
      }
    } else {
      alert('Error: search photos')
      if (onError) {
        onError()
      }
    }
  }

  const fetchRandomPhotos = async () => {
    const { type, response } = await photoRepository.getRandomPhotos()
    if (type === 'success') {
      const randomPhotos = Array.isArray(response) ? response : [response]

      const randomPhotoResponse: PhotoResponse = {
        total: randomPhotos.length,
        total_pages: 1,
        results: randomPhotos,
      }

      const photoResponse = updatePhotoResponseWithBookmarkStatus(randomPhotoResponse)
      setPhotoResponse(photoResponse)
    } else {
      alert('Error: get random photos')
    }
  }

  useEffect(() => {
    setPhotoResponse(updatePhotoResponseWithBookmarkStatus)
  }, [bookmark])

  return { photoResponse, fetchSearchPhoto, fetchRandomPhotos }
}

export default usePhoto
