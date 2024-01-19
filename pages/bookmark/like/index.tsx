import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import useBookmark from '@/hooks/useBookmark'
import styled from '@emotion/styled'

import PhotoDetailModal from '@/components/modal/PhotoDetailModal'
import NavLink from '@/components/nav/NavLink'
import PhotoList from '@/components/photo/PhotoList'

import { BOOKMARK_NAV_LIST } from '@/constants/nav'

const Home = () => {
  const { bookmark, toggleBookmark, bookmarkedPhotos } = useBookmark()

  const [photoDetailId, setPhotoDetailId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePhotoClick = (id: string) => {
    setIsModalOpen(true)
    setPhotoDetailId(id)
  }

  useEffect(() => {
    if (!isModalOpen) setPhotoDetailId('')
  }, [isModalOpen])

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
        photos={bookmarkedPhotos}
        onHartClick={toggleBookmark}
        onPhotoClick={handlePhotoClick}
      />

      {isModalOpen && (
        <PhotoDetailModal
          onModalClose={() => setIsModalOpen(false)}
          photoDetailId={photoDetailId}
          onHartClick={toggleBookmark}
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
