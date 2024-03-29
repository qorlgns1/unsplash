import React, { useEffect } from 'react'

import Link, { type LinkProps } from 'next/link'
import { useRouter } from 'next/router'

import { css } from '@emotion/react'
import styled from '@emotion/styled'

import Text from '@/components/text/Text'

interface Props extends LinkProps {
  children: React.ReactNode
}

const NavLink = ({ children, ...rest }: Props) => {
  const [stay, setStay] = React.useState(false)
  const router = useRouter()

  useEffect(() => {
    setStay(router.pathname === rest.href)
  }, [router.pathname, rest.href])

  return (
    <StyledLink {...rest} stay={JSON.stringify(stay) as 'true' | 'false'}>
      <Text>{children}</Text>
    </StyledLink>
  )
}

const StyledLink = styled(Link)<{ stay: 'true' | 'false' }>`
  align-items: center;
  display: inline-flex;
  font-size: 1.4rem;
  height: 5.6rem;
  text-decoration: none;
  white-space: nowrap;

  ${({ stay }) =>
    JSON.parse(stay) &&
    css`
      box-shadow: inset 0 -2px #111;
      pointer-events: none;

      > * {
        color: #111;
      }
    `}

  :hover {
    > * {
      color: #111;
    }
  }
`

export default NavLink
