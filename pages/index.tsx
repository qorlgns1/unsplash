import { type FormEvent, useEffect, useRef, useState } from 'react'

import Head from 'next/head'

import useBookmark from '@/hooks/useBookmark'
import usePhoto from '@/hooks/usePhoto'
import styled from '@emotion/styled'

import SearchForm from '@/components/form/SearchForm'
import PhotoDetailModal from '@/components/modal/PhotoDetailModal'
import Nav from '@/components/nav/NavBar'
import Pagination from '@/components/pagination/Pagination'
import PhotoList from '@/components/photo/PhotoList'

import { NAV_LIST } from '@/constants/nav'

import leavesImage from '@/assets/images/leaves.jpg'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [photoDetailId, setPhotoDetailId] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [beforeKeyword, setBeforeKeyword] = useState('')

  const { bookmark, toggleBookmark } = useBookmark()
  const { photoResponse, fetchSearchPhoto, fetchRandomPhotos } = usePhoto()

  const searchRef = useRef<HTMLInputElement>(null)

  const handlePhotoClick = async (id: string) => {
    setIsModalOpen(true)
    setPhotoDetailId(id)
  }

  const handleSearchOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const searchKeyword = searchRef.current?.value || beforeKeyword

    fetchSearchPhoto({
      searchQuery: searchKeyword,
      page: 1,
      onSuccess: () => {
        setCurrentPage(1)
        setBeforeKeyword(searchKeyword)
      },
    })
  }

  const handlePageChange = async (page: number) => {
    if (page === currentPage) return

    const searchKeyword = searchRef.current?.value || beforeKeyword
    fetchSearchPhoto({
      searchQuery: searchKeyword,
      page,
      onSuccess: () => {
        setCurrentPage(page)
      },
    })
  }

  useEffect(() => {
    setMounted(true)
    fetchRandomPhotos()
  }, [])

  useEffect(() => {
    if (!isModalOpen) setPhotoDetailId('')
  }, [isModalOpen])

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
