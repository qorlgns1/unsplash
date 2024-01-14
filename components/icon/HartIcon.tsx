import React from 'react'

import styled from '@emotion/styled'

import Icon from '@/assets/icons/heart.svg'

export interface HartIconProps {
  like?: boolean
}

const HartIcon = (props: HartIconProps) => {
  return <Hart {...props} />
}

const Hart = styled(Icon)<HartIconProps>`
  display: inline-block;

  & > path {
    stroke: ${({ like }) => (like === undefined ? 'lightgray' : 'white')};
    fill: ${({ like }) => (like ? '#da604b' : 'transparent')};
  }
`

export default HartIcon
