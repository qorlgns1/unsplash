import { type FormEvent, useEffect, useRef, useState } from 'react'

import Head from 'next/head'

import { bookmarkAtom } from '@/lib/recoil/atom/bookmark'
import type { PhotoResponse } from '@/modules/domain/Photo'
import { photoRepository } from '@/modules/repository/photo'
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil'

import SearchForm from '@/components/form/SearchForm'
import PhotoDetailModal from '@/components/modal/PhotoDetailModal'
import Nav from '@/components/nav/NavBar'
import PhotoList from '@/components/photo/PhotoList'

import { NAV_LIST } from '@/constants/nav'

import leavesImage from '@/assets/images/leaves.jpg'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [photoDetailId, setPhotoDetailId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [photos, setPhotos] = useState<PhotoResponse>({
    total: 0,
    total_pages: 0,
    results: [],
  })
  const [bookmark, setBookmark] = useRecoilState(bookmarkAtom)

  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearchPhoto = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const query = searchRef.current?.value || ''
    const { type, response } = await photoRepository.searchPhotos(query)
    if (type === 'success') {
      setPhotos(response)
    } else {
      alert('Error: search photos')
    }
  }

  const handleHartClick = (id: string) => {
    setBookmark((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handlePhotoClick = async (id: string) => {
    setPhotoDetailId(id)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsModalOpen(!!photoDetailId)
  }, [photoDetailId])

  useEffect(() => {
    if (!isModalOpen) setPhotoDetailId('')
  }, [isModalOpen])

  useEffect(() => {
    setPhotos((prev) => {
      const newPhotos = structuredClone(prev)
      newPhotos.results = newPhotos.results.map((photo) =>
        bookmark[photo.id] ? { ...photo, liked_by_user: true } : photo
      )
      return newPhotos
    })
  }, [bookmark])

  if (!mounted) {
    return <div>loading...</div>
  }

  return (
    <>
      <Head>
        <title>아름다운 무료 이미지 및 사진 | Unsplash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav nav={NAV_LIST} />

      <SearchWrapper image={leavesImage.src}>
        <TextWrapper>
          <Title>Will Photo</Title>
          <Infomation>인터넷의 시각 자료 출처입니다.</Infomation>
          <Infomation>모든 지역에 있는 크리에어터들의 지원을 받습니다.</Infomation>
        </TextWrapper>
        <SearchForm
          formProps={{ className: 'px-4 w-full', onSubmit: handleSearchPhoto }}
          inputProps={{
            ref: searchRef,
            placeholder: '고해상도 이미지 검색',
          }}
        />
      </SearchWrapper>

      <PhotoList
        className="p-10"
        data={photos}
        onHartClick={handleHartClick}
        onPhotoClick={handlePhotoClick}
      />

      {isModalOpen && (
        <PhotoDetailModal
          onModalClose={() => setIsModalOpen(false)}
          photoDetailId={photoDetailId}
          onHartClick={handleHartClick}
        />
      )}
    </>
  )
}

const SearchWrapper = styled.div<{ image: string }>`
  padding: 5rem 25% 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;

  height: 25rem;
`

const TextWrapper = styled.div`
  margin: 0 auto 1rem 0;

  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  color: white;
`

const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 3rem;
`

const Infomation = styled.span`
  font-weight: 300;
`
