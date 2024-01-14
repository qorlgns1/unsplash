import React from 'react'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hasBorder?: boolean
}

const Button = (props: ButtonProps) => {
  return <StyledButton {...props} />
}

const commonCss = css`
  border-radius: 0.4rem;
  padding: 0 1.1rem;
  background-color: lightgray;
  color: #6e7888;
  font-weight: 600;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  :hover {
    color: black;
  }
`

const StyledButton = styled.button<ButtonProps>`
  ${commonCss}

  ${(props) =>
    props.hasBorder &&
    css`
      border: 1px solid lightgray;
      background-color: white;

      :hover {
        border-color: black;
      }
    `}
`

export default Button
