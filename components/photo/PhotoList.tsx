import React from 'react'

import Image from 'next/image'

import type { Photo } from '@/modules/domain/Photo'
import styled from '@emotion/styled'

import HartIcon from '../icon/HartIcon'

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  photos: Photo[]
  onHartClick: (photo: Photo) => void
  onPhotoClick: (id: string) => void
}

const PhotoList = ({ photos, onPhotoClick, onHartClick, ...rest }: Props) => {
  const handleHartClick =
    (photo: Photo) => (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      onHartClick(photo)
    }

  return (
    <ImageWrapper {...rest}>
      {photos.map((photo) => {
        const { id, urls, alt_description, liked_by_user } = photo

        return (
          <Li key={id + liked_by_user} onClick={() => onPhotoClick(id)}>
            <StyledImage src={urls.thumb} alt={alt_description ?? ''} width={250} height={250} />
            <button onClick={handleHartClick(photo)}>
              <Hart like={liked_by_user} />
            </button>
          </Li>
        )
      })}
    </ImageWrapper>
  )
}

export default PhotoList

const ImageWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 20rem));
  justify-content: center;
  max-width: 132rem;
  margin: 0 auto;
  gap: 1rem;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`

const Li = styled.li`
  margin: 0 auto;

  display: flex;
  align-items: end;

  position: relative;
  width: 20rem;
  max-height: 20rem;

  cursor: pointer;
`

const Hart = styled(HartIcon)`
  position: absolute;

  bottom: 0.5rem;
  right: 0.5rem;

  cursor: pointer;
`
