import React from 'react'

import styled from '@emotion/styled'

import Button, { type ButtonProps } from '@/components/button/Button'
import HartIcon, { type HartIconProps } from '@/components/icon/HartIcon'

interface Props extends ButtonProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  like?: HartIconProps['like']
}

const HartIconButton = ({ like, children, ...rest }: Props) => {
  return (
    <StyledButton {...rest}>
      {children}
      <HartIcon like={like} />
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  :hover {
    svg > path {
      stroke: black;
    }
  }
`

export default HartIconButton
