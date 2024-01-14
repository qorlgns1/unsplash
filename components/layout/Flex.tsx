import React from 'react'
import styled from '@emotion/styled'

interface FlexProps {
  display?: 'flex' | 'inline-flex'
  direction?: 'row' | 'column'
  align?: 'stretch' | 'center' | 'flex-start' | 'flex-end'
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'end'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: number | string
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

const Flex = ({
  display = 'flex',
  direction = 'row',
  align = 'stretch',
  justify = 'flex-start',
  wrap = 'nowrap',
  gap = 0,
  children,
  style,
  className,
}: FlexProps) => {
  return (
    <FlexContainer
      display={display}
      direction={direction}
      align={align}
      justify={justify}
      wrap={wrap}
      gap={gap}
      style={{ ...style }}
      className={className}
    >
      {children}
    </FlexContainer>
  )
}

const FlexContainer = styled.div<FlexProps>`
  display: ${({ display }) => display};
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-wrap: ${({ wrap }) => wrap};
  gap: ${({ gap }) => gap};
`

export default Flex
