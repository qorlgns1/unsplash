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
    stroke: #f2f4f6;
    fill: ${({ like }) => (like ? '#ec5642' : 'transparent')};

    :hover {
      stroke: #cfd5db;
    }
  }
`

export default HartIcon
