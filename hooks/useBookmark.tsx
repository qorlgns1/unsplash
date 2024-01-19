import { useMemo } from 'react'

import { bookmarkAtom } from '@/lib/recoil/atom/bookmark'
import type { Photo } from '@/modules/domain/Photo'
import { useRecoilState } from 'recoil'

const useBookmark = () => {
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom)

  const toggleBookmark = (photo: Photo) => {
    setBookmark((prev) => {
      const bookmark = structuredClone(prev)
      bookmark[photo.id] ? delete bookmark[photo.id] : (bookmark[photo.id] = photo)

      return bookmark
    })
  }

  const updatePhotoWithBookmarkStatus = (photo: Photo): Photo => {
    return { ...photo, liked_by_user: !!bookmark[photo.id] }
  }

  const bookmarkedPhotos: Photo[] = useMemo(
    () => Object.keys(bookmark).map((key) => ({ ...bookmark[key], liked_by_user: true })),
    [bookmark]
  )

  return {
    bookmark,
    toggleBookmark,
    updatePhotoWithBookmarkStatus,
    bookmarkedPhotos,
  }
}

export default useBookmark
