import { type FormEvent, useEffect, useRef, useState } from 'react'

import Head from 'next/head'

import useBookmark from '@/hooks/useBookmark'
import type { PhotoResponse } from '@/modules/domain/Photo'
import { photoRepository } from '@/modules/repository/photo'
import styled from '@emotion/styled'

import Pagination from '@/components/Pagination'
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
  const [photoResponse, setPhotoResponse] = useState<PhotoResponse>({
    total: 0,
    total_pages: 0,
    results: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [beforeKeyword, setBeforeKeyword] = useState('')

  const { bookmark, toggleBookmark, updatePhotoWithBookmarkStatus } = useBookmark()

  const searchRef = useRef<HTMLInputElement>(null)

  const updatePhotoResponseWithBookmarkStatus = (photoResponse: PhotoResponse) => ({
    ...photoResponse,
    results: photoResponse.results.map(updatePhotoWithBookmarkStatus),
  })

  const searchPhoto = async (page: number) => {
    const query = searchRef.current?.value || beforeKeyword
    const { type, response } = await photoRepository.searchPhotos({ query, page })
    if (type === 'success') {
      const photoResponse = updatePhotoResponseWithBookmarkStatus(response)
      setPhotoResponse(photoResponse)
      setBeforeKeyword(query)
    } else {
      alert('Error: search photos')
    }
  }

  const handlePhotoClick = async (id: string) => {
    setIsModalOpen(true)
    setPhotoDetailId(id)
  }

  const handleSearchOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setCurrentPage(1)
    await searchPhoto(1)
  }

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return

    setCurrentPage(page)
    await searchPhoto(page)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
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

    fetchRandomPhotos()
  }, [])

  useEffect(() => {
    if (!isModalOpen) setPhotoDetailId('')
  }, [isModalOpen])

  useEffect(() => {
    setPhotoResponse(updatePhotoResponseWithBookmarkStatus)
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
          formProps={{ className: 'px-4 w-full', onSubmit: handleSearchOnSubmit }}
          inputProps={{
            ref: searchRef,
            placeholder: '고해상도 이미지 검색',
          }}
        />
      </SearchWrapper>

      <PhotoList
        className="p-10"
        photos={photoResponse.results}
        onHartClick={toggleBookmark}
        onPhotoClick={handlePhotoClick}
      />

      {photoResponse?.results.length > 0 && searchRef?.current?.value && (
        <Pagination
          className="justify-center mb-10"
          currentPage={currentPage}
          totalPages={photoResponse.total_pages <= 200 ? photoResponse.total_pages : 200}
          range={3}
          onPageChange={handlePageChange}
        />
      )}

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

const SearchWrapper = styled.div<{ image: string }>`
  padding: 0 25%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-image: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-size: cover;

  min-height: 25rem;
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
