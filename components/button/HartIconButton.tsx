import React from 'react'
import HartSvg from '@/assets/icons/heart.svg'
import styled from '@emotion/styled'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  like?: boolean
}

const HartIconButton = ({ like, ...rest }: Props) => {
  return (
    <Button like={like} {...rest}>
      <HartSvg />
    </Button>
  )
}

const Button = styled.button<Props>`
  & > svg > path {
    stroke: ${({ like }) => (like === undefined ? '#111111' : 'white')};
    fill: ${({ like }) => (like ? '#da604b' : 'transparent')};
  }
`

export default HartIconButton
