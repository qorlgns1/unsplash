import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import { bookmarkAtom } from '@/lib/recoil/atom/bookmark'
import type { Photo } from '@/modules/domain/Photo'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'

import PhotoDetailModal from '@/components/modal/PhotoDetailModal'
import NavLink from '@/components/nav/NavLink'
import PhotoList from '@/components/photo/PhotoList'

import { BOOKMARK_NAV_LIST } from '@/constants/nav'

const Home = () => {
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom)
  const [photos, setPhotos] = useState(Object.keys(bookmark).map((key) => bookmark[key]))
  const [photoDetailId, setPhotoDetailId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const updatePhotosBookmarkedByUser = (photos: Photo[]) => {
    return photos.map((photo) =>
      bookmark[photo.id] ? { ...photo, liked_by_user: true } : { ...photo, liked_by_user: false }
    )
  }

  const handleHartClick = (photo: Photo) => {
    setBookmark((prev) => {
      const bookmark = structuredClone(prev)
      bookmark[photo.id] ? delete bookmark[photo.id] : (bookmark[photo.id] = photo)

      return bookmark
    })
  }

  const handlePhotoClick = (id: string) => setPhotoDetailId(id)

  useEffect(() => {
    setIsModalOpen(!!photoDetailId)
  }, [photoDetailId])

  useEffect(() => {
    if (!isModalOpen) setPhotoDetailId('')
  }, [isModalOpen])

  useEffect(() => {
    setPhotos(() => {
      const photos = Object.keys(bookmark).map((key) => bookmark[key])
      return updatePhotosBookmarkedByUser(photos)
    })
  }, [bookmark])

  return (
    <>
      <Head>
        <title>아름다운 무료 이미지 및 사진 | like</title>
      </Head>

      <nav>
        <Ul>
          {BOOKMARK_NAV_LIST.map((nav) => (
            <li key={nav.link}>
              <NavLink href={nav.link}>{nav.title}</NavLink>
            </li>
          ))}
        </Ul>
      </nav>

      <PhotoList
        className="p-10"
        photos={photos}
        onHartClick={handleHartClick}
        onPhotoClick={handlePhotoClick}
      />

      {isModalOpen && (
        <PhotoDetailModal
          onModalClose={() => setIsModalOpen(false)}
          photoDetailId={photoDetailId}
          onHartClick={handleHartClick}
          bookmark={bookmark}
        />
      )}
    </>
  )
}

const Ul = styled.ul`
  margin: 0 auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
`

export default Home
