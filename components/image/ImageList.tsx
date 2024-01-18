import React from 'react'

import Image from 'next/image'

import type { PhotoResponse } from '@/modules/domain/Photo'
import styled from '@emotion/styled'

import HartIcon from '../icon/HartIcon'

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  data: PhotoResponse
  onHartClick: (id: string) => void
}

const ImageList = ({ data, onHartClick, ...rest }: Props) => {
  return (
    <ImageWrapper {...rest}>
      {data.results.map((photo) => {
        const { id, urls, alt_description, liked_by_user } = photo

        return (
          <Li key={id} onClick={() => console.log(`photo ${id} 상세보기 모달 띄우기 `)}>
            <StyledImage src={urls.regular} alt={alt_description ?? ''} width={250} height={250} />
            <button
              onClick={(e) => {
                e.stopPropagation()
                onHartClick(photo.id)
              }}
            >
              <Hart like={liked_by_user} />
            </button>
          </Li>
        )
      })}
    </ImageWrapper>
  )
}

export default ImageList

const ImageWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));

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
