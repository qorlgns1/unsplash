import React from 'react'

import styled from '@emotion/styled'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'primary' | 'black'
}

const Text = ({ color = 'primary', ...rest }: Props) => {
  return <BaseText color={color} {...rest} />
}

const BaseText = styled.span<Props>`
  align-items: center;
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${({ color }) => (color === 'primary' ? '#767676' : '#000')};
`

export default Text
