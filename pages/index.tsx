import { type FormEvent, useEffect, useRef, useState } from 'react'

import Head from 'next/head'

import type { PhotoResponse } from '@/modules/domain/Photo'
import { photoRepository } from '@/modules/repository/photo'
import styled from '@emotion/styled'

import SearchForm from '@/components/form/SearchForm'
import ImageList from '@/components/image/ImageList'
import Nav from '@/components/nav/NavBar'

import { NAV_LIST } from '@/constants/nav'

import leavesImage from '@/assets/images/leaves.jpg'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)

  const [photos, setPhotos] = useState<PhotoResponse>({
    total: 0,
    total_pages: 0,
    results: [],
  })
  console.log(photos)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const query = searchRef.current?.value || ''
    const { type, response } = await photoRepository.searchPhotos(query)
    if (type === 'success') {
      setPhotos(response)
    } else {
      alert('Error: search photos')
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

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
          formProps={{ className: 'px-4 w-full', onSubmit }}
          inputProps={{
            ref: searchRef,
            placeholder: '고해상도 이미지 검색',
          }}
        />
      </SearchWrapper>

      <ImageList
        className="p-10"
        data={photos}
        onHartClick={(id) => console.log(`hart click id = ${id}`)}
      />
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
