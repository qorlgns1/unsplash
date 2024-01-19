import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import type { Photo, PhotoDetail } from '@/modules/domain/Photo'
import { photoRepository } from '@/modules/repository/photo'
import { getTimeDifference } from '@/utils/date'
import { numberWithCommas } from '@/utils/number'
import styled from '@emotion/styled'

import Portal from '@/components/modal/Portal'

import Button from '../button/Button'
import CloseIcon from '../icon/CloseIcon'
import HartIcon from '../icon/HartIcon'
import BasicText from '../text/Text'
import { BackDrop } from './BackDrop'

interface Props {
  onModalClose: () => void
  photoDetailId: string
  onHartClick: (photo: Photo) => void
  bookmark: Record<string, Photo>
}

const PhotoDetailModal = ({
  bookmark,
  onModalClose,
  photoDetailId,
  onHartClick,
  ...rest
}: Props) => {
  const [photoDetail, setPhotoDetail] = useState<PhotoDetail>()

  useEffect(() => {
    setPhotoDetail((prev) => {
      if (!prev) return prev

      return bookmark[prev.id]
        ? { ...prev, liked_by_user: true }
        : { ...prev, liked_by_user: false }
    })
  }, [bookmark])

  useEffect(() => {
    photoRepository.getPhoto(photoDetailId).then(({ type, response }) => {
      if (type === 'success') {
        const photoDetail: PhotoDetail = {
          ...response,
          liked_by_user: bookmark[response.id] ? true : false,
        }

        setPhotoDetail(photoDetail)
      } else {
        alert('Error: get photo detail')
        onModalClose()
      }
    })
  }, [photoDetailId])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onModalClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'visible'
    }
  })

  return (
    <Portal>
      <BackDrop onClick={onModalClose} />
      {photoDetail && (
        <Wrapper {...rest}>
          <Header>
            <HeaderLeft>
              <button onClick={onModalClose}>
                <CloseIcon />
              </button>
              <Text color="black" className="text-800">
                {photoDetail.user.name}
              </Text>
            </HeaderLeft>
            <HeaderRight>
              <button onClick={() => onHartClick(photoDetail)}>
                <HartIcon like={photoDetail?.liked_by_user} />
              </button>
              <Button hasBorder>다운로드</Button>
            </HeaderRight>
          </Header>
          <Main>
            <StyledImage
              src={photoDetail.urls.regular}
              width={photoDetail.width}
              height={photoDetail.height}
              alt={photoDetail.alt_description || ''}
            />
          </Main>
          <Footer>
            <Descriptions>
              <Description>
                <Text>이미지 크기</Text>
                <Text color="black">{`${photoDetail.width} X ${photoDetail.height}`}</Text>
              </Description>
              <Description>
                <Text>업로드</Text>
                <Text color="black">{`${getTimeDifference(photoDetail.created_at)} 게시됨`}</Text>
              </Description>
              <Description>
                <Text>다운로드</Text>
                <Text color="black">{numberWithCommas(photoDetail.downloads || 0)}</Text>
              </Description>
            </Descriptions>

            <Tags>
              {photoDetail.tags?.map((item) => <Button key={item.title}>{item.title}</Button>)}
            </Tags>
          </Footer>
        </Wrapper>
      )}
    </Portal>
  )
}

const Wrapper = styled.div`
  margin: 5% auto;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: white;
  width: 80%;
  overflow-y: scroll;
  border-radius: 0.5rem;
`

const Header = styled.header`
  display: Flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`

const HeaderLeft = styled.div`
  display: flex;
  gap: 1rem;
`
const HeaderRight = styled(HeaderLeft)``

const Main = styled.main``

const StyledImage = styled(Image)`
  max-height: 50vh;
  object-fit: contain;
`

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`

const Descriptions = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5rem;
`

const Description = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Text = styled(BasicText)`
  font-size: 1.6rem;
  font-weight: 600;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

export default PhotoDetailModal
